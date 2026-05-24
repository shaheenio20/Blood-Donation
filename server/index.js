const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.amsiamk.mongodb.net/?appName=Cluster0`;

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
async function getProfileCollection() {
  await connectClient();
  return client.db("bloodDB").collection("profiles");
}

// Root endpoint
app.get("/", (req, res) => {
  res.send("Blood Server is running!");
});

// ========== Users API ==========
app.post("/users", async (req, res) => {
  try {
    const userCollection = await getUserCollection();
    const newUser = req.body;
    const result = await userCollection.insertOne(newUser);
    res.send(result);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

app.patch("/users", async (req, res) => {
  try {
    const userCollection = await getUserCollection();
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

// ========== Blood Donors API ==========
app.get("/bloodDonors", async (req, res) => {
  try {
    const bloodDonorCollection = await getBloodDonorCollection();
    const { bloodGroup, location, email } = req.query;
    let query = {};
    if (email && email.trim() !== "") {
      query.email = email.trim();
    }
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

app.get("/bloodDonors/:id", async (req, res) => {
  try {
    const bloodDonorCollection = await getBloodDonorCollection();
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const bloodDonor = await bloodDonorCollection.findOne(query);
    res.send(bloodDonor);
  } catch (error) {
    console.error("Error fetching blood donor:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

app.post("/bloodDonors", async (req, res) => {
  try {
    const bloodDonorCollection = await getBloodDonorCollection();
    const bloodDonor = req.body;
    const result = await bloodDonorCollection.insertOne(bloodDonor);
    res.send(result);
  } catch (error) {
    console.error("Error creating blood donor:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

app.put("/bloodDonors/:id", async (req, res) => {
  try {
    const bloodDonorCollection = await getBloodDonorCollection();
    const id = req.params.id;
    const updatedDonor = req.body;
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: {
        name: updatedDonor.name,
        phone: updatedDonor.phone,
        bloodGroup: updatedDonor.bloodGroup,
        location: updatedDonor.location,
      },
    };
    const result = await bloodDonorCollection.updateOne(filter, updateDoc);
    res.send(result);
  } catch (error) {
    console.error("Error updating blood donor:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

app.delete("/bloodDonors/:id", async (req, res) => {
  try {
    const bloodDonorCollection = await getBloodDonorCollection();
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await bloodDonorCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    console.error("Error deleting blood donor:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// ========== Contact API ==========
app.post("/contacts", async (req, res) => {
  try {
    const contactCollection = await getContactCollection();
    const contact = req.body;
    const result = await contactCollection.insertOne(contact);
    res.send(result);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// ========== Profile API ==========
app.post("/profiles", async (req, res) => {
  try {
    const profileCollection = await getProfileCollection();
    const profileUpdate = req.body;
    const result = await profileCollection.insertOne(profileUpdate);
    res.send(result);
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// Start server only in local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Blood Server is running on port ${PORT}`);
  });
}

module.exports = app;