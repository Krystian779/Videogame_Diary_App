// import the libraries we installed with npm
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // loads variables from .env file

// create the Express app
const app = express();

console.log('Starting backend server...');

// allow Angular frontend to call this backend API
const corsOptions = {
  origin: 'https://main.d1a98ijehi68oz.amplifyapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('/.*/', cors(corsOptions));

// allow server to understand JSON data sent in requests
app.use(express.json());

// define the structure of a diary game document in MongoDB
const diaryGameSchema = new mongoose.Schema({
  rawgId: Number,
  name: String,
  rating: Number,
  released: String,
  background_image: String,
  status: String,
  userRating: Number,
});

// create a model based on the schema
// this lets us run MongoDB commands like find(), save(), delete()
const DiaryGame = mongoose.model('DiaryGame', diaryGameSchema);

// test route to prove the API is running
app.get('/', (req, res) => {
  res.send('API is running');
});

// GET all diary games from MongoDB
app.get('/diary', '/prod/diary', async (req, res) => {
  try {
    const games = await DiaryGame.find();
    res.status(200).json(games);
  } catch (error) {
    console.log('Error getting diary games:', error);
    res.status(500).json({ message: 'Failed to get diary games' });
  }
});

// POST a new diary game into MongoDB
app.post('/diary', '/prod/diary', async (req, res) => {
  try {
    const game = new DiaryGame(req.body);
    const savedGame = await game.save();

    res.status(201).json(savedGame);
  } catch (error) {
    console.log('Error saving diary game:', error);
    res.status(500).json({ message: 'Failed to save diary game' });
  }
});

// DELETE one diary game using its MongoDB _id
app.delete('/diary/:id', '/prod/diary/:id', async (req, res) => {
  try {
    const deletedGame = await DiaryGame.findByIdAndDelete(req.params.id);

    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.status(200).json({ message: 'Game removed from diary' });
  } catch (error) {
    console.log('Error deleting diary game:', error);
    res.status(500).json({ message: 'Failed to delete diary game' });
  }
});

// use port from .env, otherwise default to 5050
const PORT = process.env.PORT || 5050;

// connect to MongoDB first, then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });
