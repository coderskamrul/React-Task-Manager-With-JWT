const express = require('express');
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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




const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const logger = (req, res, next) => {
    console.log('Logging route:', req.hostname, req.originalUrl);
    next();
};

const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;
    console.log('ok tt ' , token);
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
            const token = jwt.sign(user, process.env.JWT_SECRET_TOKEN, { expiresIn: '1h' });
            console.log(token);
            res
            .cookie('token', token, { 
                httpOnly: true,
                secure: false,
            })
            .send({ message: 'Token generated successfully' });
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
