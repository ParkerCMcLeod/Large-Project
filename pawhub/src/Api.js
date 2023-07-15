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

async function run() {
  const uri = "mongodb+srv://LargeProjectMember:b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn@cluster0.usxyfaf.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  await client.connect();

  const database = client.db("users");
  const collectionName = "users_log";

  const collection = database.collection(collectionName);
  
  // API to read all documents
  app.get('/api', async (req, res) => {
    try {
      const documents = await collection.find({}).toArray();
      res.json(documents);
    } catch (err) {
      res.status(500).send("Error occurred");
    }
  });

  // API to create new document
  app.post('/api', async (req, res) => {
    try {
      const newUser = req.body;
      const result = await collection.insertOne(newUser);
      res.json(result.ops[0]); // return created document
    } catch (err) {
      res.status(500).send("Error occurred");
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
      res.status(500).send("Error occurred");
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
      res.status(500).send("Error occurred");
    }
  });

}

run().catch(console.dir);