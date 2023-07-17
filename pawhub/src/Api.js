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

// Error Handling Middleware
function handleError(err, req, res, next) {
  console.error(err);
  res.status(500).send(err);
}

// Setting up server port
const port = 3001;

app.listen(port, () => {
  console.log("Server listening on port 3001");
});

// Registering the error handling middleware
app.use(handleError);

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
  app.get("/search", async (req, res) => {
    try {
      // Extract the query parameters from the request
      const query = req.query;

      // Perform the search
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

  // API to search for document by query
  app.get("/searchID", async (req, res) => {
    try {
      // Extract the query parameters from the request
      const query = req.query;

      // Perform the search
      const documents = await collection.find(query).toArray();

      if (documents.length > 0) {
        // Extract the IDs from the documents
        const documentIds = documents.map((doc) => doc._id);

        res.json(documentIds);
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

  app.put("/update", async (req, res) => {
    try {
      const listIDs = req.body.listIDs;
      const updatedUser = req.body.updatedUser;
      let modifiedCount = 0;
  
      for (const id of listIDs) {
        const result = await collection.updateOne(
          { _id: ObjectId(id) },
          { $set: updatedUser }
        );
        modifiedCount += result.modifiedCount;
      }
  
      if (modifiedCount === 0) {
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

  // Error Handling Middleware
  app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err);
  });

}

run().catch(console.dir);
