// import the libraries we installed with npm
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // loads variables from .env file

// create the Express app
const app = express();

console.log('Starting backend server...');

// allow Angular frontend to call this backend API
app.use(cors());

// allow server to understand JSON data sent in requests
app.use(express.json());

// define the structure of a diary game document in MongoDB
const diaryGameSchema = new mongoose.Schema({
  rawgId: Number,
  name: String,
  rating: Number,
  released: String,
  background_image: String,
});

// create a model based on the schema
// this lets us run MongoDB commands like find(), save(), delete()
const DiaryGame = mongoose.model('DiaryGame', diaryGameSchema);

// test route to prove the API is running
app.get('/', (req, res) => {
  res.send('API is running');
});

// GET all diary games from MongoDB
app.get('/diary', async (req, res) => {
  const games = await DiaryGame.find();
  res.json(games);
});

// POST a new diary game into MongoDB
app.post('/diary', async (req, res) => {
  const game = new DiaryGame(req.body);
  const savedGame = await game.save();
  res.json(savedGame);
});

// DELETE one diary game using its MongoDB _id
app.delete('/diary/:id', async (req, res) => {
  await DiaryGame.findByIdAndDelete(req.params.id);
  res.json({ message: 'Game removed from diary' });
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
