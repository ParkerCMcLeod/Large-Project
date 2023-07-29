// Importing required modules
const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors module

const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Replace these values with your actual SMTP credentials
const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'pawhubverify@gmail.com',
    pass: '@R00tyT00ty69!',
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

// Creating Express app
const app = express();

// Middleware setup
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

// Set up CORS middleware with appropriate options
app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
  const uri =
    "mongodb+srv://LargeProjectMember:b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn@cluster0.usxyfaf.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  await client.connect();

  const databaseUsers = client.db("users");
  const users = databaseUsers.collection("users");
  const currentUserIDIncrement = databaseUsers.collection("currentUserIDIncrement");

  const databasePosts = client.db("posts");
  const posts = databasePosts.collection("posts");
  const currentPostIDIncrement = databasePosts.collection("currentPostIDIncrement");

  // API to send user verification email
  app.post("/api/sendUserVerification", async (req, res) => {
    const email = req.body.email;
    const token = crypto.randomBytes(32).toString('hex');

    // Assume you have a user model named 'User'
    // Replace 'User' with your actual user model name and 'your-database' with your database instance
    const result = await user.updateOne({ email: email }, { token: token });

    const verificationLink = `https://your-website.com/verify?token=${token}`;
    const mailOptions = {
      from: 'pawhubverify@gmail.com',
      to: email,
      subject: 'Verify Your Email Address',
      html: `<p>Hello ${email},</p><p>Click the following link to verify your email address:</p><p><a href="${verificationLink}">${verificationLink}</a></p>`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        res.status(500).send('Failed to send verification email.');
      } else {
        res.status(200).send('Verification email sent.');
      }
    });
  });

  // API to update user verification status
  app.put("/api/updateUserVerification", async (req, res) => {
    const token = req.query.token;

    // Assume you have a user model named 'User'
    // Replace 'User' with your actual user model name and 'your-database' with your database instance
    const user = await User.findOne({ token: token });

    if (!user) {
      return res.status(404).send('Invalid or expired verification token.');
    }

    const filter = { userID: user.UserID };

    // Assume you have a verified field in your User model to mark the user's email verification status
    // Replace 'verified' with your actual field name representing the email verification status
    const result = await user.updateOne(filter, { verified: true });

    // Redirect to a success page or send a response indicating successful verification
    return res.status(200).send('Email successfully verified!');
  });

  // API to search for users by query
  app.get("/api/searchUsersReturnUsers", async (req, res) => {
    try {
      // Extract the query parameters from the request
      const query = req.query;

      if (query.hasOwnProperty("userID")) {
        query.userID = parseInt(query.userID);
      }

      // Perform the search
      const documents = await users.find(query).toArray();

      if (documents.length > 0) {
        res.json(documents);
      } else {
        res.status(204).send("No documents found");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to search for users IDs by query
  app.get("/api/searchUsersReturnIDs", async (req, res) => {
    try {
      // Extract the query parameters from the request
      const query = req.query;

      if (query.hasOwnProperty("userID")) {
        query.userID = parseInt(query.userID);
      }

      // Perform the search
      const documents = await users.find(query).toArray();

      if (documents.length > 0) {
        // Extract the IDs from the documents
        const documentIds = documents.map((doc) => doc._id);

        res.json(documentIds);
      } else {
        res.status(204).send("No documents found");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to create a new user
  app.post("/api/addNewUser", async (req, res) => {
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
      const verified = false;
      const token = "";
      newUser = {
        userID: newUserID,
        dateCreated: newDateCreated,
        ...newUser,
        verified: verified,
        token: token
      };
      const result = await users.insertOne(newUser);
      res.json({ message: "Data inserted successfully", result });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to update users
  app.put("/api/updateMatchingUsers", async (req, res) => {
    try {
      const listIDs = req.body.listIDs;
      const updatedUser = req.body.updatedUser;
      const objectIDs = listIDs.map((id) => new ObjectId(id));
      const filter = { _id: { $in: objectIDs } };

      const result = await users.updateMany(filter, { $set: updatedUser });

      const modifiedCount = result.modifiedCount;

      if (modifiedCount === 0) {
        res.status(204).send("No documents were found for the provided IDs");
      } else {
        res.json({ message: "Data updated successfully", modifiedCount: modifiedCount });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to delete users
  app.delete("/api/deleteMatchingUsers", async (req, res) => {
    try {
      // Extract the query parameters from the request body
      const query = req.query;

      const result = await users.deleteMany(query);
      if (result.deletedCount === 0) {
        res.status(204).send("No such document exists");
      } else {
        res.json({ message: "Data deleted successfully", deletedCount: result.deletedCount });
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
  app.get("/api/searchPostsReturnPosts", async (req, res) => {
    try {
      // Extract the query parameters from the request
      const query = req.query;

      if (query.hasOwnProperty("postID")) {
        query.postID = parseInt(query.postID);
      }
      if (query.hasOwnProperty("numLikes")) {
        query.numLikes = parseInt(query.numLikes);
      }
      if (query.hasOwnProperty("userID")) {
        query.userID = parseInt(query.userID);
      }

      // Perform the search
      const documents = await posts.find(query).toArray();

      if (documents.length > 0) {
        res.json(documents);
      } else {
        res.status(204).send("No documents found");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to search for posts IDs by query
  app.get("/api/searchPostsReturnIDs", async (req, res) => {
    try {
      // Extract the query parameters from the request
      const query = req.query;

      if (query.hasOwnProperty("postID")) {
        query.postID = parseInt(query.postID);
      }
      if (query.hasOwnProperty("numLikes")) {
        query.numLikes = parseInt(query.numLikes);
      }
      if (query.hasOwnProperty("userID")) {
        query.userID = parseInt(query.userID);
      }

      // Perform the search
      const documents = await posts.find(query).toArray();

      if (documents.length > 0) {
        // Extract the IDs from the documents
        const documentIds = documents.map((doc) => doc._id);

        res.json(documentIds);
      } else {
        res.status(204).send("No documents found");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to create a new post
  app.post("/api/addNewPost", async (req, res) => {
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
      res.json({ message: "Data inserted successfully", newPostID });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to update posts
  app.put("/api/updateMatchingPosts", async (req, res) => {
    try {
      const listIDs = req.body.listIDs;
      if(listIDs === '') {
        res.status(204).send("No IDs were passed");
        return;
      }
      const updatedPost = req.body.updatedPost;
      const objectIDs = listIDs.map((id) => new ObjectId(id));
      const filter = { _id: { $in: objectIDs } };

      const result = await posts.updateMany(filter, { $set: updatedPost });

      const modifiedCount = result.modifiedCount;

      if (modifiedCount === 0) {
        res.status(204).send("No documents were found for the provided IDs");
      } else {
        res.json({ message: "Data updated successfully", modifiedCount: modifiedCount });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to delete posts
  app.delete("/api/deleteMatchingPosts", async (req, res) => {
    try {
      // Extract the query parameters from the request body
      const query = req.body;

      const result = await posts.deleteMany(query);
      if (result.deletedCount === 0) {
        res.status(204).send("No such document exists");
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