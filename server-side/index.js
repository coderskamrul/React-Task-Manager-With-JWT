const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.bvll5ro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

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

async function run() {
    try {
        // Connect the client to the MongoDB server
        await client.connect();
        console.log("Successfully connected to MongoDB!");

        // Select the database and collection
        const db = client.db("userDB");
        const usersCollection = db.collection("users");

        // POST route to add user data
        // app.post('/users', async (req, res) => {
        //     const newUser = req.body;
        //     console.log(newUser);
        //     const result = await usersCollection.insertOne(newUser);
        //     res.send(result);
        // });

        // // GET route to fetch all user data
        // app.get('/users', async (req, res) => {
        //     try {
        //         const users = await usersCollection.find({}).toArray(); // Fetch all users
        //         res.send(users);
        //     } catch (error) {
        //         console.error("Error fetching users", error);
        //         res.status(500).send({ error: "Failed to fetch users" });
        //     }
        // });

        // app.get('/update/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const result = await usersCollection.findOne(query);
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
        //     const result = await usersCollection.updateOne(query, updatedUser, options);

        //     res.send(result);

        // })

        // app.delete('/users/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const result = await usersCollection.deleteOne(query);
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
