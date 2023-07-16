const { MongoClient } = require("mongodb");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 3001

app.listen(port, () => {
  console.log('Server listening on port 3001');
});

const fs = require('fs');

async function incrementAndSaveInteger(filePath) {
  try {
    // Read the file asynchronously
    const data = await fs.promises.readFile(filePath, 'utf8');
    
    // Parse the contents of the file as an integer
    let intValue = parseInt(data, 10);

    // Increment the integer value by one
    intValue += 1;

    // Save the updated integer back to the file
    await fs.promises.writeFile(filePath, intValue.toString(), 'utf8');

    return intValue;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function run() {
  const uri = "mongodb+srv://LargeProjectMember:b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn@cluster0.usxyfaf.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  await client.connect();

  const database = client.db("users");
  const collectionName = "users";

  const collection = database.collection(collectionName);
  
  // API to read ALL documents
  app.get('/api', async (req, res) => {
    try {
      const documents = await collection.find({}).toArray();
      res.json(documents);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to create new document
  app.post('/api', async (req, res) => {
    try {
      let newUserID;
      let newUser = req.body;
      try {
        newUserID = await incrementAndSaveInteger('src\\data\\currentUserID.txt');
      } catch (err) {
        console.error('An error occurred:', err);
      }
      const currentDate = new Date();
      const newDateCreated = currentDate.toISOString();
      newUser = {"userID": newUserID, "dateCreated": newDateCreated, ...newUser};
      await collection.insertOne(newUser);
      res.send('Data inserted successfully');
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to update document
  app.put('/api/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      const result = await collection.updateOne({ _id: MongoClient.ObjectId(id) }, { $set: newData });
      if (result.modifiedCount === 0) {
        res.status(404).send("No such document exists");
      } else {
        res.send('Data updated successfully');
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // API to delete document
  app.delete('/api/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await collection.deleteOne({ _id: MongoClient.ObjectId(id) });
      if (result.deletedCount === 0) {
        res.status(404).send("No such document exists");
      } else {
        res.send('Data deleted successfully');
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

}

run().catch(console.dir);