const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const http = require('http');
const WebSocket = require('ws');
const app = express();
app.use(cors());
app.use(express.json());






mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'storyadmin', // Specify the database name for storyadmin
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define the schema for the storyadmin model
const storyadminSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId }, 
  username: String,
  password: String,
});

// Register the storyadmin model with the defined schema
const StoryAdmin = mongoose.model('StoryAdmin', storyadminSchema);

// Define the schema for the story-form details model
const storyFormSchema = new mongoose.Schema({
  title: String,
  image: String,
  story: String,
});

// Register the storyForm model with the defined schema
const StoryForm = mongoose.model('StoryForm', storyFormSchema);

app.use(express.static(path.join(__dirname, 'build')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/auth', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received username:', username);
  try {
    const user = await StoryAdmin.findOne({ username });

    console.log('Retrieved user:', user); // Add this line for debugging

    if (!user) {
      return res.status(401).send('User not found');
    }

    // Compare passwords without hashing
    if (user.password !== password) {
      return res.status(401).send('Invalid password');
    }

    res.status(200).send('Authenticated');
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(500).send('Authentication failed');
  }
});
app.post('/add-story', async (req, res) => {
  const { title, image, story } = req.body;
  try {
    // Check if a story with the same title already exists
    const existingStory = await StoryForm.findOne({ title });
    if (existingStory) {
      return res.status(400).send('Story with the same title already exists');
    }

    // Create a new document with the received data
    const newStory = new StoryForm({ title, image, story });
    // Save the new document to the database
    await newStory.save();
    res.status(200).send('Story added successfully');
  } catch (err) {
    console.error('Error adding story:', err);
    res.status(500).send('Failed to add story');
  }
});
app.get('/stories', async (req, res) => {
  try {
    const stories = await StoryForm.find();
    res.status(200).json(stories);
  } catch (err) {
    console.error('Error fetching stories:', err);
    res.status(500).send('Failed to fetch stories');
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
