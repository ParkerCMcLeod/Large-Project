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

async function run() {
  const uri = "mongodb+srv://LargeProjectMember:b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn@cluster0.usxyfaf.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  await client.connect();

  const databaseUsers = client.db("users");

  const collectionUsers = "users";
  const users = databaseUsers.collection(collectionUsers);

  const collectionCurrentUserIDIncrement = "currentUserIDIncrement";
  const currentUserIDIncrement = databaseUsers.collection(collectionCurrentUserIDIncrement);

  const databasePosts = client.db("posts");

  const collectionPosts = "posts";
  const posts = databasePosts.collection(collectionPosts);

  const collectionCurrentPostIDIncrement = "currentPostIDIncrement";
  const currentPostIDIncrement = databasePosts.collection(collectionCurrentPostIDIncrement);

  // API to search for users by query
  app.get("/searchUsersReturnUsers", async (req, res) => {
    try {
      // Extract the query parameters from the request
      const query = req.query;

      // Perform the search
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

  // API to search for users IDs by query
  app.get("/searchUsersReturnIDs", async (req, res) => {
    try {
      // Extract the query parameters from the request
      const query = req.query;

      // Perform the search
      const documents = await users.find(query).toArray();

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

  // API to create a new user
  app.post("/addNewUser", async (req, res) => {
    try {
      let newUserID;
      let newUser = req.body;
      try {
        newUserID = await incrementCurrentUserIDIncrement();
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
      const result = await users.insertOne(newUser);
      res.json({message: "Data inserted successfully", result});
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to update users
  app.put("/updateMatchingUsers", async (req, res) => {
    try {
      const listIDs = req.body.listIDs;
      const updatedUser = req.body.updatedUser;
      const objectIDs = listIDs.map(id => new ObjectId(id));
      const filter = { _id: { $in: objectIDs } };

      const result = await users.updateMany(filter, { $set: updatedUser });

      const modifiedCount = result.modifiedCount;

      if (modifiedCount === 0) {
        res.status(404).send('No documents were found for the provided IDs');
      } else {
        res.json({message: 'Data updated successfully', modifiedCount: modifiedCount});
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to delete users
  app.delete("/deleteMatchingUsers", async (req, res) => {
    try {
      // Extract the query parameters from the request
      const query = req.query;

      const result = await users.deleteMany(query);
      if (result.deletedCount === 0) {
        res.status(404).send("No such document exists");
      } else {
        res.json({message: "Data deleted successfully", deletedCount: result.deletedCount});
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to increment and return currentUserIDIncrement
  async function incrementCurrentUserIDIncrement() {
    try {
      // Find the document, increment the value and return the updated document
      const result = await currentUserIDIncrement.findOneAndUpdate(
        {},  // Filter - empty to match all documents in the collection
        { $inc: { currentUserIDIncrement: 1 } },  // Update - increment the value by 1
        { returnOriginal: false }  // Options - return the updated document
      );

      // If the document was not found, send a 404 response
      if (!result.value) {
        return res.status(404).send('No document found');
      }

      // If the document was found and updated, send the new value
      return result.value.currentUserIDIncrement;
    } catch (err) {
      // If an error occurred, send a 500 response
      res.status(500).send(err);
    }
  };


  // API to search for posts by query
  app.get("/searchPostsReturnPosts", async (req, res) => {
    try {
      // Extract the query parameters from the request
      const query = req.query;

      // Perform the search
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

  // API to search for posts IDs by query
  app.get("/searchPostsReturnIDs", async (req, res) => {
    try {
      // Extract the query parameters from the request
      const query = req.query;

      // Perform the search
      const documents = await posts.find(query).toArray();

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

  // API to create a new post
  app.post("/addNewPost", async (req, res) => {
    try {
      let newPostID;
      let newPost = req.body;
      try {
        newPostID = await incrementCurrentPostIDIncrement();
      } catch (err) {
        console.error("An error occurred:", err);
      }
      const currentDate = new Date();
      const newDateCreated = currentDate.toISOString();
      newPost = {
        postID: newPostID,
        dateCreated: newDateCreated,
        ...newPost,
      };
      const result = await posts.insertOne(newPost);
      res.json({message: "Data inserted successfully", result});
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to update posts
  app.put("/updateMatchingPosts", async (req, res) => {
    try {
      const listIDs = req.body.listIDs;
      const updatedPost = req.body.updatedPost;
      const objectIDs = listIDs.map(id => new ObjectId(id));
      const filter = { _id: { $in: objectIDs } };

      const result = await posts.updateMany(filter, { $set: updatedPost });

      const modifiedCount = result.modifiedCount;

      if (modifiedCount === 0) {
        res.status(404).send('No documents were found for the provided IDs');
      } else {
        res.json({message: 'Data updated successfully', modifiedCount: modifiedCount});
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to delete posts
  app.delete("/deleteMatchingPosts", async (req, res) => {
    try {
      // Extract the query parameters from the request
      const query = req.query;

      const result = await posts.deleteMany(query);
      if (result.deletedCount === 0) {
        res.status(404).send("No such document exists");
      } else {
        res.json({message: "Data deleted successfully", deletedCount: result.deletedCount});
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
        {},  // Filter - empty to match all documents in the collection
        { $inc: { currentPostIDIncrement: 1 } },  // Update - increment the value by 1
        { returnOriginal: false }  // Options - return the updated document
      );

      // If the document was not found, send a 404 response
      if (!result.value) {
        return res.status(404).send('No document found');
      }

      // If the document was found and updated, send the new value
      return result.value.currentPostIDIncrement;
    } catch (err) {
      // If an error occurred, send a 500 response
      res.status(500).send(err);
    }
  };


  // Error handling middleware
  app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err);
  });
}

run().catch(console.dir);