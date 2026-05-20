const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { ready } = require("localforage");
require("dotenv").config();
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.amsiamk.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let clientPromise = null;
async function connectClient() {
  if (!clientPromise) {
    clientPromise = client.connect().catch(err => {
      clientPromise = null;
      throw err;
    });
  }
  await clientPromise;
}
async function getUserCollection() {
  await connectClient();
  return client.db("bloodDB").collection("users");
}
async function getBloodDonorCollection() {
  await connectClient();
  return client.db("bloodDB").collection("bloodDonors");
}
async function getContactCollection() {
  await connectClient();
  return client.db("bloodDB").collection("contacts");
}
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = await getUserCollection();
    const bloodDonorCollection = await getBloodDonorCollection();
    const contactCollection = await getContactCollection();

    // users api
    app.post("/users", async(req, res) => {
      try{
        const newUser = req.body;
        const result = await userCollection.insertOne(newUser);
        res.send(result);
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ error: true, message: error.message });
      }
    })
    app.patch("/users", async(req, res) => {
      try {
        const user = req.body;
        const filter = { email: user.email, password: user.password };
        const updateDoc = {
          $set: {
            lastLogin: new Date(), 
            password: user.password, 
          },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send({ error: true, message: error.message });
    }
    });
    // Blood donors api
    app.get("/bloodDonors", async(req, res) => {
      try {
        const { bloodGroup, location } = req.query;
        let query = {};
        if (bloodGroup && bloodGroup !== "" && bloodGroup !== "All") {
          query.bloodGroup = bloodGroup;
        }
        if (location && location.trim() !== "") {
          query.location = { $regex: location.trim(), $options: "i" };
        }
        const bloodDonors = await bloodDonorCollection.find(query).toArray();
        res.send(bloodDonors);
      } catch (error) {
        console.error("Error fetching blood donors:", error);
        res.status(500).send({ error: true, message: error.message });
      }
    });
    app.get("/bloodDonors/:id", async(req, res) => {
      try{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const bloodDonor = await bloodDonorCollection.findOne(query);
        res.send(bloodDonor);
      } catch (error) {
        console.error("Error fetching blood donor:", error);
        res.status(500).send({ error: true, message: error.message });
      }
    });
    app.post("/bloodDonors", async (req, res) => {
      try {
        const bloodDonor = req.body;
        const result = await bloodDonorCollection.insertOne(bloodDonor);
        res.send(result);
      } catch (error) {
        console.error("Error creating blood donor:", error);
        res.status(500).send({ error: true, message: error.message });
      }
    });
    
    app.put("/bloodDonors/:id", async(req, res) => {
      try {
        const id = req.params.id;
        const updatedDonor = req.body;
        const filter = {_id: new ObjectId(id)};
        const updateDoc = {
          $set: {
            name: updatedDonor.name,
            phone: updatedDonor.phone,
            bloodGroup: updatedDonor.bloodGroup,
            location: updatedDonor.location
          },
        };
        const result = await bloodDonorCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        console.error("Error updating blood donor:", error);
        res.status(500).send({ error: true, message: error.message });
      }
    });
    app.delete("/bloodDonors/:id", async(req, res) => {
      try {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await bloodDonorCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        console.error("Error deleting blood donor:", error);
        res.status(500).send({ error: true, message: error.message });
      }
    });
    //contact api
    app.post("/contacts", async(req, res) => {
      try{
        const contact = req.body;
        const result = await contactCollection.insertOne(contact);
        res.send(result);
      } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).send({ error: true, message: error.message });
      }
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Blood Server is running!");
});

app.listen(PORT, () => {
    console.log(`Blood Server is running on port ${PORT}`);
});