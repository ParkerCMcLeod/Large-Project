// Importing required modules
const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs").promises;

// Creating Express app
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Setting up server port
const port = 3001;

// Error Handling Middleware
function handleError(err, req, res, next) {
  console.error(err);
  res.status(500).send(err);
}
app.use(handleError);

app.listen(port, () => {
  console.log("Server listening on port 3001");
});

// File operations function
async function incrementAndSaveInteger(filePath) {
  const data = await fs.readFile(filePath, "utf8");
  let intValue = parseInt(data, 10);
  intValue += 1;
  await fs.writeFile(filePath, intValue.toString(), "utf8");
  return intValue;
}

async function run() {
  const uri =
    "mongodb+srv://LargeProjectMember:b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn@cluster0.usxyfaf.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  await client.connect();

  const database = client.db("users");
  const collectionName = "users";

  const collection = database.collection(collectionName);

  // API to read ALL documents
  app.get("/api", async (req, res) => {
    try {
      const documents = await collection.find({}).toArray();
      res.json(documents);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to read one document via passed ID
  app.get("/api/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const document = await collection.findOne({ _id: ObjectId(id) });

      if (document) {
        res.json(document);
      } else {
        res.status(404).send("No document found");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to search for document by query
  app.post("/api/search/:query", async (req, res) => {
    try {
      const { query } = req.params;
      const documents = await collection.find(query).toArray();

      if (documents.length > 0) {
        res.json(documents);
      } else {
        res.status(404).send("No documents found");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to create a new document
  app.post("/api", async (req, res) => {
    try {
      let newUserID;
      let newUser = req.body;
      try {
        newUserID = await incrementAndSaveInteger("src/data/currentUserID.txt");
      } catch (err) {
        console.error("An error occurred:", err);
      }
      const currentDate = new Date();
      const newDateCreated = currentDate.toISOString();
      newUser = {
        userID: newUserID,
        dateCreated: newDateCreated,
        ...newUser,
      };
      await collection.insertOne(newUser);
      res.send("Data inserted successfully");
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to update a document
  app.put("/api/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      const result = await collection.updateOne(
        { _id: ObjectId(id) },
        { $set: newData }
      );
      if (result.modifiedCount === 0) {
        res.status(404).send("No such document exists");
      } else {
        res.send("Data updated successfully");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to delete a document
  app.delete("/api/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await collection.deleteOne({ _id: ObjectId(id) });
      if (result.deletedCount === 0) {
        res.status(404).send("No such document exists");
      } else {
        res.send("Data deleted successfully");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
}

run().catch(console.dir);
