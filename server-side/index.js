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

        app.post('/tasks', async (req, res) => {
            try {
                
                const project = await projectCollection.findOne({ projectId: req.body.projectId });
                //console.log(project);
                if (!project) {
                    return res.status(404).send({ message: 'Project not found' });
                }
                //inside project data get the column data using column id from the request body i want to store the task data in this column
                const column = project.column.find(col => col.id === req.body.progress);
                if (!column) {
                    return res.status(404).send({ message: 'Column not found' });
                }

                //Get last task id from the project collection
                const allTasks = await projectCollection.aggregate([
                    {$match: { projectId: req.body.projectId }},
                    {$unwind: '$column'},
                    {$unwind: '$column.tasks'},
                    {
                        $project: {
                            _id: 0,
                            projectId: 1,
                            task: "$column.tasks",
                        }
                    },
                    { $sort: { "task.created_at": 1 } } // Sort by `created_at` field (ascending order)

                ]).toArray();

                // Get the last task
                const lastTask = allTasks[allTasks.length - 1];
                let lastTaskIdNumber = 99; // Default if no tasks exist
                if (lastTask.task && lastTask.task.taskId) {
                    const parts = lastTask.task.taskId.split('-');
                    if (parts.length === 2 && !isNaN(parts[1])) {
                        lastTaskIdNumber = parseInt(parts[1], 10);
                    }
                }
                // Determine the new numeric ID
                const newTaskIdNumber = lastTaskIdNumber + 1;
                // Create the new taskId with the "WHO-" prefix
                const newTaskId = `WHO-${newTaskIdNumber}`;

                const newTask = {
                    id: new ObjectId().toHexString(),
                    taskId: newTaskId,
                    title: req.body.title,
                    description: req.body.description,
                    priority: req.body.priority,
                    progress: column.id,
                    tags: req.body.tags,
                    assignedUsers: req.body.assignedUsers,
                    date: req.body.date,
                    projectId: req.body.projectId,
                    createdBy: req.body.createdBy,
                    created_at: new Date()
                };
                column.tasks.push(newTask);
                const query = { projectId: req.body.projectId };
                const updatedProject = {
                    $set: {
                        column: project.column,
                    },
                };
                const result = await projectCollection.updateOne(query, updatedProject);
                res.status(200).send({ message: 'Task added successfully ok', result });
            } catch (error) {
                console.log('not task save');
                console.error(error);
                res.status(500).send({ message: 'Internal Server Error for adding task' });
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
        app.delete('/task/delete/:projectId/:taskId', async (req, res) => {
            try {
                const { projectId, taskId } = req.params;
        
                // Update query
                const result = await projectCollection.updateOne(
                    { projectId: projectId, "column.tasks.taskId": taskId }, // Match project and task
                    {
                        $pull: { "column.$.tasks": { taskId: taskId } } // Pull task from the specific column
                    }
                );
        
                if (result.modifiedCount > 0) {
                    res.status(200).send({ message: "Task deleted successfully" });
                } else {
                    res.status(404).send({ message: "Task not found or already deleted" });
                }
            } catch (error) {
                console.error("Error deleting task:", error);
                res.status(500).send({ error: "Failed to delete task" });
            }
        });
        //Delete specific Column route
        app.delete('/column/delete/:projectId/:columnId', async (req, res) => {
            try {
                const { projectId, columnId } = req.params;
                // Delete the column with the specified columnId
                const result = await projectCollection.updateOne(
                    { projectId: projectId }, // Match project by projectId
                    {
                        $pull: { column: { id: columnId } } // Pull the column with the matching id
                    }
                );
        
                if (result.modifiedCount > 0) {
                    res.status(200).send({ message: "Column deleted successfully" });
                } else {
                    res.status(404).send({ message: "Column not found or already deleted" });
                }
            } catch (error) {
                console.error("Error deleting column:", error);
                res.status(500).send({ error: "Failed to delete column" });
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

        //Put router to updated '/projects/${id}/columns' column data in project collection as well as task progress field in task collection
        app.put('/projects/:id/columns', async (req, res) => {
            try {
                const id = req.params.id;
                const newColumn = req.body;
                const query = { projectId: id };
                console.log(id);
                console.dir(newColumn);
                //ss
                newColumn.forEach(column => {
                    //console.log(`Column ID: ${column.id}, Title: ${column.title}`);
                  
                    // Iterate over each task in the column
                    column.tasks.forEach(task => {
                      //console.log(`Task ID: ${task.id}, Title: ${task.title}`);
                  
                      // Modify the task as needed
                      task.progress = column.id;
                    });
                  });
                //ee
                const updatedProject = {
                    $set: {
                        column: newColumn,
                    },
                };
                const result = await projectCollection.updateOne(query, updatedProject);
                if (result.matchedCount === 0) {
                    return res.status(404).send({ message: 'Project not found' });
                }
             
                res.status(200).send({ message: 'Column added successfully moved', result});
            } catch (error) {
                console.error("Error updating project:", error);
                res.status(500).send({ message: 'Internal Server Error', error: error.message });
            }
        });

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
