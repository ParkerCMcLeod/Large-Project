const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

// Connect to the MongoDB server
mongoose.connect('mongodb+srv://LargeProjectMember:b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn@cluster0.usxyfaf.mongodb.net/mydatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the MongoDB server');
});

const userSchema = new mongoose.Schema({
  userID: String,
  name: String,
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.get('/api/user', (req, res) => {
  User.find((err, users) => {
    if (err) {
      console.error('Failed to fetch users:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(users);
    }
  });
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
