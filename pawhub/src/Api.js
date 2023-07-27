const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

function handleError(err, req, res, next) {
  console.error(err);
  res.status(500).send(err);
}

const port = 3001;

app.listen(port, () => {
  console.log("Server listening on port 3001");
});

app.use(handleError);

async function run() {
  const uri = "mongodb+srv://LargeProjectMember:***REMOVED***@cluster0.usxyfaf.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  await client.connect();

  const databaseUsers = client.db("users");
  const users = databaseUsers.collection("users");
  const currentUserIDIncrement = databaseUsers.collection("currentUserIDIncrement");

  const databasePosts = client.db("posts");
  const posts = databasePosts.collection("posts");
  const currentPostIDIncrement = databasePosts.collection("currentPostIDIncrement");

  app.get("/api/searchUsersReturnUsers", async (req, res) => {
    try {
      const query = req.query;
      // Ensure the 'userID' property is sent as a number
      if (query.userID) {
        query.userID = parseInt(query.userID);
      }

      const documents = await users.find(query).toArray();

      if (documents.length > 0) {
        res.json(documents);
      } else {
        res.status(404).send("No documents found");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get("/api/searchUsersReturnIDs", async (req, res) => {
    try {
      const query = req.query;
      // Ensure the 'userID' property is sent as a number
      if (query.userID) {
        query.userID = parseInt(query.userID);
      }

      const documents = await users.find(query).toArray();

      if (documents.length > 0) {
        const documentIds = documents.map((doc) => doc._id);
        res.json(documentIds);
      } else {
        res.status(404).send("No documents found");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post("/api/addNewUser", async (req, res) => {
    try {
      // ... (unchanged code)
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.put("/api/updateMatchingUsers", async (req, res) => {
    try {
      // ... (unchanged code)
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.delete("/api/deleteMatchingUsers", async (req, res) => {
    try {
      const query = req.query;
      // Ensure the 'userID' property is sent as a number
      if (query.userID) {
        query.userID = parseInt(query.userID);
      }

      const result = await users.deleteMany(query);
      if (result.deletedCount === 0) {
        res.status(404).send("No such document exists");
      } else {
        res.json({ message: "Data deleted successfully", deletedCount: result.deletedCount });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get("/api/searchPostsReturnPosts", async (req, res) => {
    try {
      const query = req.query;
      // Ensure the 'postID' property is sent as a number
      if (query.postID) {
        query.postID = parseInt(query.postID);
      }

      const documents = await posts.find(query).toArray();

      if (documents.length > 0) {
        res.json(documents);
      } else {
        res.status(404).send("No documents found");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get("/api/searchPostsReturnIDs", async (req, res) => {
    try {
      const query = req.query;
      // Ensure the 'postID' property is sent as a number
      if (query.postID) {
        query.postID = parseInt(query.postID);
      }

      const documents = await posts.find(query).toArray();

      if (documents.length > 0) {
        const documentIds = documents.map((doc) => doc._id);
        res.json(documentIds);
      } else {
        res.status(404).send("No documents found");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post("/api/addNewPost", async (req, res) => {
    try {
      // ... (unchanged code)
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.put("/api/updateMatchingPosts", async (req, res) => {
    try {
      // ... (unchanged code)
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.delete("/api/deleteMatchingPosts", async (req, res) => {
    try {
      const query = req.body;
      // Ensure the 'postID' property is sent as a number
      if (query.postID) {
        query.postID = parseInt(query.postID);
      }

      const result = await posts.deleteMany(query);
      if (result.deletedCount === 0) {
        res.status(404).send("No such document exists");
      } else {
        res.json({ message: "Data deleted successfully", deletedCount: result.deletedCount });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to increment and return currentPostIDIncrement
  async function incrementCurrentPostIDIncrement() {
    try {
      // Find the document, increment the value and return the updated document
      const result = await currentPostIDIncrement.findOneAndUpdate(
        {}, // Filter - empty to match all documents in the collection
        { $inc: { currentPostIDIncrement: 1 } }, // Update - increment the value by 1
        { returnOriginal: false } // Options - return the updated document
      );

      // If the document was not found, throw an error
      if (!result.value) {
        throw new Error("No document found");
      }

      // If the document was found and updated, send the new value
      return result.value.currentPostIDIncrement;
    } catch (err) {
      // If an error occurred, throw the error
      throw err;
    }
  }

  // Error handling middleware
  app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err);
  });
}

run().catch(console.dir);