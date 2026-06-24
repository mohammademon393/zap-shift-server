// Load environment variables
require("dotenv").config();

// DNS configuration (Fix MongoDB Atlas SRV lookup issue)
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Package imports
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

// App initialization
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vknfgr8.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // creaete database and collection
        const db = client.db("zap_shift_db");
        const parcelsCollection = db.collection("parcels");


        // parcels releted apis
        // get all parcels
        app.get("/parcels", async (req, res) => {

        });

        // post a parcel
        app.post("/parcels", async (req, res) => {
            const parcel = req.body;
            const result = await parcelsCollection.insertOne(parcel);
            res.send(result);
        });



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// server running
app.get('/', (req, res) => {
    res.send('zap shifting server running...');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});