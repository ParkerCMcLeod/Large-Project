const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

// Connect to the MongoDB server
mongoose.connect('mongodb+srv://LargeProjectMember:b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn@cluster0.usxyfaf.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the MongoDB server');
});

// Define API routes and logic here

const user = new mongoose.Schema({
	userID: String,
	name: String,
	username: String,
	email: String,
	password: String,
	// profilePicture: images\,
	// dateCreated: 2023-XX-XXTXX:XX:XX.XXX+XX:XX,
	// friendList: []
});

const User = mongoose.model('User', user);

app.get('/api/user', (req, res) => {
  User.find((err, user) => {
    if (err) {
      console.error('Failed to fetch users:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(user);
    }
  });
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

fetch('/api/user')
  .then(response => response.json())
  .then(user => {
    // Handle the users received from the API
  })
  .catch(error => {
    // Handle any errors
  });