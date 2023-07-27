const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Creating Express app
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Error handling middleware
function handleError(err, req, res, next) {
  console.error(err);
  res.status(500).send(err);
}

// Registering the error handling middleware
app.use(handleError);

// Setting up server port
const port = 3001;

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Connect to the database
async function connectToDatabase() {

  const uri = "mongodb+srv://LargeProjectMember:b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn@cluster0.usxyfaf.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  await client.connect();

  const databaseUsers = client.db("users");
  const users = databaseUsers.collection("users");
  const currentUserIDIncrement = databaseUsers.collection("currentUserIDIncrement");

  const databasePosts = client.db("posts");
  const posts = databasePosts.collection("posts");
  const currentPostIDIncrement = databasePosts.collection("currentPostIDIncrement");

  return {
    users,
    currentUserIDIncrement,
    posts,
    currentPostIDIncrement,
  };
}

// API to search for users by query
async function searchUsersReturnUsers(req, res) {
  const { users } = await connectToDatabase();
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
    handleError(err, res);
  }
}

// API to search for users IDs by query
async function searchUsersReturnIDs(req, res) {
  const { users } = await connectToDatabase();
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
    handleError(err, res);
  }
}

// API to create a new user
async function addNewUser(req, res) {
  const { users } = await connectToDatabase();
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
    res.json({ message: "Data inserted successfully", result });
  } catch (err) {
    handleError(err, res);
  }
}

// API to update users
async function updateMatchingUsers(req, res) {
  const { users } = await connectToDatabase();
  try {
    const listIDs = req.body.listIDs;
    const updatedUser = req.body.updatedUser;
    const objectIDs = listIDs.map((id) => new ObjectId(id));
    const filter = { _id: { $in: objectIDs } };

    const result = await users.updateMany(filter, { $set: updatedUser });

    const modifiedCount = result.modifiedCount;

    if (modifiedCount === 0) {
      res.status(404).send("No documents were found for the provided IDs");
    } else {
      res.json({ message: "Data updated successfully", modifiedCount: modifiedCount });
    }
  } catch (err) {
    handleError(err, res);
  }
}

// API to delete users
async function deleteMatchingUsers(req, res) {
  const { users } = await connectToDatabase();
  try {
    // Extract the query parameters from the request body
    const query = req.query;

    const result = await users.deleteMany(query);
    if (result.deletedCount === 0) {
      res.status(404).send("No such document exists");
    } else {
      res.json({ message: "Data deleted successfully", deletedCount: result.deletedCount });
    }
  } catch (err) {
    handleError(err, res);
  }
}

// API to increment and return currentUserIDIncrement
async function incrementCurrentUserIDIncrement() {
  const { currentUserIDIncrement } = await connectToDatabase();
  try {
    // Find the document, increment the value, and return the updated document
    const result = await currentUserIDIncrement.findOneAndUpdate(
      {}, // Filter - empty to match all documents in the collection
      { $inc: { currentUserIDIncrement: 1 } }, // Update - increment the value by 1
      { returnOriginal: false } // Options - return the updated document
    );

    // If the document was not found, throw an error
    if (!result.value) {
      throw new Error("No document found");
    }

    // If the document was found and updated, send the new value
    return result.value.currentUserIDIncrement;
  } catch (err) {
    // If an error occurred, throw the error
    throw err;
  }
}

// API to search for posts by query
async function searchPostsReturnPosts(req, res) {
    const { posts } = await connectToDatabase();
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
      handleError(err, res);
    }
  }
  
  // API to search for posts IDs by query
  async function searchPostsReturnIDs(req, res) {
    const { posts } = await connectToDatabase();
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
      handleError(err, res);
    }
  }
  
  // API to create a new post
  async function addNewPost(req, res) {
    const { posts } = await connectToDatabase();
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
      res.json({ message: "Data inserted successfully", result });
    } catch (err) {
      handleError(err, res);
    }
  }
  
  // API to update posts
  async function updateMatchingPosts(req, res) {
    const { posts } = await connectToDatabase();
    try {
      const listIDs = req.body.listIDs;
      const updatedPost = req.body.updatedPost;
      const objectIDs = listIDs.map((id) => new ObjectId(id));
      const filter = { _id: { $in: objectIDs } };
  
      const result = await posts.updateMany(filter, { $set: updatedPost });
  
      const modifiedCount = result.modifiedCount;
  
      if (modifiedCount === 0) {
        res.status(404).send("No documents were found for the provided IDs");
      } else {
        res.json({ message: "Data updated successfully", modifiedCount: modifiedCount });
      }
    } catch (err) {
      handleError(err, res);
    }
  }
  
  // API to delete posts
  async function deleteMatchingPosts(req, res) {
    const { posts } = await connectToDatabase();
    try {
      // Extract the query parameters from the request body
      const query = req.body;
  
      const result = await posts.deleteMany(query);
      if (result.deletedCount === 0) {
        res.status(404).send("No such document exists");
      } else {
        res.json({ message: "Data deleted successfully", deletedCount: result.deletedCount });
      }
    } catch (err) {
      handleError(err, res);
    }
  }
  
  // API to increment and return currentPostIDIncrement
  async function incrementCurrentPostIDIncrement() {
    const { currentPostIDIncrement } = await connectToDatabase();
    try {
      // Find the document, increment the value, and return the updated document
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
  
  module.exports = {
    connectToDatabase,
    searchUsersReturnUsers,
    searchUsersReturnIDs,
    addNewUser,
    updateMatchingUsers,
    deleteMatchingUsers,
    searchPostsReturnPosts,
    searchPostsReturnIDs,
    addNewPost,
    updateMatchingPosts,
    deleteMatchingPosts,
  };