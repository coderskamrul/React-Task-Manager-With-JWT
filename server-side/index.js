const express = require('express');
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { start } = require('repl');

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.bvll5ro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors(
    {
        origin: ['http://localhost:5173'],
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser());


// Multer configuration
// Ensure the images directory exists
const imagesDir = path.join(__dirname, '../client-side/public/images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });


// Routes
app.get('/', (req, res) => {
    res.send('task manager server is running...');  // Responding to root route
});


const generateUniqueId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//Custom Middleware for logging
const logger = async (req, res, next) => {
    console.log('Logging route:', req.hostname, req.originalUrl);
    next();
};

//Custom Middleware for verifying JWT token
const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;
    // console.log('ok tt ' , token);
    if (!token) {
        return res.status(401).send('Access Denied');
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET_TOKEN, function(err, decoded) {
            if (err) {
                return res.status(401).send('Invalid Token');
            }
            req.user = decoded;
            next();
            console.log(req.user);
          });
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};


async function run() {
    try {
        // Connect the client to the MongoDB server
        await client.connect();
        console.log("Successfully connected to MongoDB!");

        // Select the database and collection
        const db = client.db("TaskManagerDB");
        const taskCollection = db.collection("Tasks");
        const projectCollection = db.collection("Projects");
        const usersCollection = db.collection("Users");

        // POST Multer route to add Project data start
        app.post("/projects", upload.single("image"), async (req, res) => {
            try {
                if (!req.file) {
                    return res.status(400).send({ message: 'No file uploaded' });
                }
                const newProject = {
                    projectId: generateUniqueId(),
                    title: req.body.title,
                    description: req.body.description,
                    image: req.file.filename,
                    status: 'Pending',
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    priority: req.body.priority,
                    assignedUsers: req.body.assignedUsers.split(','),
                    tasks: [],
                    column: [],
                    tags: [],
                    created_at: new Date()
                };
                console.log(req.body);
                 const result = await projectCollection.insertOne(newProject);
                // res.send(result);
                 res.status(200).send({ message: 'Project added successfully', result });
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'Internal Server Error' });
            }
        });

        //PUT route to update project 'column' field with new column data
        app.put('/projects/:id', logger, async (req, res) => {
            try {
                const id = req.params.id;
                const newColumn = req.body; // Expecting a single object in the request body
        
                // Validate request body
                if (!newColumn || typeof newColumn !== 'object') {
                    return res.status(400).send({ message: 'Request body must be an object' });
                }
        
                const query = { projectId: id }; // Query to match the project by ID
                const updatedProject = {
                    $push: {
                        column: newColumn, // Push the single object into the column array
                    },
                };
        
                // Perform the database update
                const result = await projectCollection.updateOne(query, updatedProject);
        
                if (result.matchedCount === 0) {
                    return res.status(404).send({ message: 'Project not found' });
                }
        
                res.status(200).send({ message: 'Column added successfully', result });
            } catch (error) {
                console.error("Error updating project:", error);
                res.status(500).send({ message: 'Internal Server Error', error: error.message });
            }
        });
        
        // POST Multer route to add Project data end

        // POST Multer route to add Image data start
        app.post("/upload-image", upload.single("image"), async (req, res) => {
            try {
                if (!req.file) {
                    return res.status(400).send({ message: 'No file uploaded' });
                }
                const newTask = {
                    title: req.body.title,
                    description: req.body.description,
                    image: req.file.filename,
                    status: 'Pending',
                    users: [],
                    created_at: new Date()
                };
                const result = await taskCollection.insertOne(newTask);
                // res.send(result);
                res.status(200).send({ message: 'File uploaded successfully', result });
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'Internal Server Error' });
            }
        });

        // GET all Projects route to fetch all project data
        app.get('/dashboard/projects',logger,  async (req, res) => {
            try {
                //Get JWT Valid Token To Verify this "req.user" is valid or not in Here
                console.log('ok ase');
                console.log(req.user);
                const email = req.query.email;
                const role = req.query.role;
                //i want to get all projects where assignedUsers array contains the email or role is admin and this role filed is in the user collection not project collection
                // const result = await projectCollection.find({ $or: [{ assignedUsers: email }, { role: 'admin' }] }).toArray(); // Fetch all projects
                if (role === 'admin') {
                    const result = await projectCollection.find({}).toArray(); // Fetch all projects
                    res.status(200).send({ message: 'Get all projects successfully', result });
                } else {
                    const result = await projectCollection.find({ assignedUsers: email }).toArray(); // Fetch all projects
                    res.status(200).send({ message: 'Get all projects successfully base on email', result });
                }
                // res.send(users);
            } catch (error) {
                console.error("Error fetching users", error);
                res.status(500).send({ error: "Failed to fetch users" });
            }
        });
        // GET Tasks route to fetch all user data
        app.get('/upload-image', logger, verifyToken, async (req, res) => {
            try {
                //Get JWT Valid Token To Verify this "req.user" is valid or not in Here
                console.log('valid user ' , req.user);

                const result = await taskCollection.find({}).toArray(); // Fetch all tasks
                res.status(200).send({ message: 'Get all task successfully', result });
                // res.send(users);
            } catch (error) {
                console.error("Error fetching users", error);
                res.status(500).send({ error: "Failed to fetch users" });
            }
        });

        //POST route with JWT token
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.JWT_SECRET_TOKEN, { expiresIn: '7d' });
            console.log(token);
            res
            .cookie('token', token, { 
                httpOnly: true,
                secure: false,
            })
            .send({ message: 'Token generated successfully' });
        });

        //Post Tasks Route to Store Data in Database
        // app.post('/tasks', async (req, res) => {
        //     try {
        //         // Find the task with the highest numeric portion of taskId
        //         const lastTask = await taskCollection.findOne().sort({ taskId: -1 });

        //         // Extract numeric part from the last task's taskId (e.g., "WHO-100" -> 100)
        //         const lastTaskIdNumber = lastTask ? parseInt(lastTask.taskId.split("-")[1], 10) : 99;

        //         // Determine the new numeric ID
        //         const newTaskIdNumber = lastTaskIdNumber + 1;

        //         // Create the new taskId with the "WHO-" prefix
        //         const newTaskId = `WHO-${newTaskIdNumber}`;

        //         const newTask = {
        //             taskId: newTaskId,
        //             title: req.body.title,
        //             description: req.body.description,
        //             priority: req.body.priority,
        //             progress: req.body.progress,
        //             tags: req.body.tags,
        //             assignedUsers: req.body.assignedUsers,
        //             date: req.body.date,
        //             projectId: req.body.projectId,
        //             createdBy: req.body.createdBy,
        //             created_at: new Date()
        //         };
        //         const result = await taskCollection.insertOne(newTask);
        //         res.status(200).send({ message: 'Task added successfully', result });
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).send({ message: 'Internal Server Error' });
        //     }
        // });

        app.post('/tasks', async (req, res) => {
            try {
                // Ensure `taskCollection` is defined and connected
                if (!taskCollection) {
                    return res.status(500).send({ message: 'Database not connected' });
                }
        
                // Find the task with the highest numeric portion of taskId
                const lastTask = await taskCollection.findOne({}, { sort: { taskId: -1 } });
        
                // Extract numeric part from the last task's taskId (e.g., "WHO-100" -> 100)
                let lastTaskIdNumber = 99; // Default if no tasks exist
                if (lastTask && lastTask.taskId) {
                    const parts = lastTask.taskId.split('-');
                    if (parts.length === 2 && !isNaN(parts[1])) {
                        lastTaskIdNumber = parseInt(parts[1], 10);
                    }
                }
        
                // Determine the new numeric ID
                const newTaskIdNumber = lastTaskIdNumber + 1;
        
                // Create the new taskId with the "WHO-" prefix
                const newTaskId = `WHO-${newTaskIdNumber}`;
        
                // Construct the new task object
                const newTask = {
                    taskId: newTaskId,
                    title: req.body.title,
                    description: req.body.description,
                    priority: req.body.priority,
                    progress: req.body.progress,
                    tags: req.body.tags,
                    assignedUsers: req.body.assignedUsers,
                    date: req.body.date,
                    projectId: req.body.projectId,
                    createdBy: req.body.createdBy,
                    created_at: new Date()
                };
        
                // Insert the new task into the database
                const result = await taskCollection.insertOne(newTask);
        
                // Send a success response
                res.status(200).send({ message: 'Task added successfully', result });
                // res.status(200).send({ message: 'Task added successfully', task: newTask });
            } catch (error) {
                console.error('Error creating task:', error);
                res.status(500).send({ message: 'Internal Server Error' });
            }
        });

        //Specific Project Tasks 'Progress' field update route
        app.put('/task/edit', async (req, res) => {
            try {
                const id = req.body.taskId;
                const newProgress = req.body.progress;
                const query = { taskId: id };
                const updatedTask = {
                    $set: {
                        progress: newProgress
                    },
                };
                const result = await taskCollection.updateOne(query, updatedTask);
                res.status(200).send({ message: 'Task progress updated successfully', result });
            } catch (error) {
                console.error("Error updating task progress", error);
                res.status(500).send({ error: "Failed to update task progress" });
            }
        });

        //Delete specific task route
        app.delete('/task/delete/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { taskId: id };
                const result = await taskCollection.deleteOne(query);
                res.status(200).send({ message: 'Task deleted successfully', result });
            } catch (error) {
                console.error("Error deleting task", error);
                res.status(500).send({ error: "Failed to delete task" });
            }
        });
        
        //Get the all tasks data from database
        app.get('/dashboard/projects/tasks', async (req, res) => {
            try {
                const result = await taskCollection.find({}).toArray();
                res.status(200).send({ message: 'Get all tasks successfully', result });
            } catch (error) {
                console.error("Error fetching tasks", error);
                res.status(500).send({ error: "Failed to fetch tasks" });
            }
        });
        app.post('/users', async (req, res) => {
            try {
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    uid: req.body.uid,
                    created_at: new Date()
                };
                const result = await usersCollection.insertOne(newUser);
                res.status(200).send({ message: 'User added successfully', result });
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: 'Internal Server Error' });
            }
        });

        //Get the all users data
        app.get('/users', async (req, res) => {
            try {
                const result = await usersCollection.find({}).toArray();
                res.status(200).send({ message: 'Get all users successfully', result });
            } catch (error) {
                console.error("Error fetching users", error);
                res.status(500).send({ error: "Failed to fetch users" });
            }
        });

        // GET Tasks route to fetch all user data
        // app.get('/upload-image', async (req, res) => {
        //     try {
        //         const result = await taskCollection.find({}).toArray(); // Fetch all tasks
        //         res.status(200).send({ message: 'Get all task successfully', result });
        //         // res.send(users);
        //     } catch (error) {
        //         console.error("Error fetching users", error);
        //         res.status(500).send({ error: "Failed to fetch users" });
        //     }
        // });

        // app.get('/update/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const result = await taskCollection.findOne(query);
        //     res.send(result);

        // })

        // app.put('/update/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const usersUp = req.body;
        //     const query = { _id: new ObjectId(id) };
        //     const options = { upsert: true };
        //     const updatedUser = {
        //         $set: {
        //             name: usersUp.name,
        //             email: usersUp.email
        //         },
        //     };
        //     const result = await taskCollection.updateOne(query, updatedUser, options);

        //     res.send(result);

        // })

        // app.delete('/users/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const result = await taskCollection.deleteOne(query);
        //     res.send(result);

        // })
        // Any other routes or database operations can be added here
    } catch (error) {
        console.error("Error occurred during database operations", error);
    }
}

// Run the MongoDB connection and API server
run().catch(console.log);

// Start the server without closing the MongoDB connection
app.listen(PORT, () => {
    console.log(`Server is running on ports - ${PORT}`);
});
