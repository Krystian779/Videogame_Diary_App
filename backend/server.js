const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

console.log('Starting backend server...');

const corsOptions = {
  origin: 'https://main.d1a98ijehi68oz.amplifyapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Remove API Gateway stage prefix if it is forwarded to Express
app.use('/prod', (req, res, next) => {
  req.url = req.url.replace(/^\/prod/, '');
  next();
});

const diaryGameSchema = new mongoose.Schema({
  rawgId: Number,
  name: String,
  rating: Number,
  released: String,
  background_image: String,
  status: String,
  userRating: Number,
});

const DiaryGame = mongoose.model('DiaryGame', diaryGameSchema);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/diary', async (req, res) => {
  try {
    const games = await DiaryGame.find();
    res.status(200).json(games);
  } catch (error) {
    console.log('Error getting diary games:', error);
    res.status(500).json({ message: 'Failed to get diary games' });
  }
});

app.post('/diary', async (req, res) => {
  try {
    const game = new DiaryGame(req.body);
    const savedGame = await game.save();

    res.status(201).json(savedGame);
  } catch (error) {
    console.log('Error saving diary game:', error);
    res.status(500).json({ message: 'Failed to save diary game' });
  }
});

app.delete('/diary/:id', async (req, res) => {
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

const PORT = process.env.PORT || 5050;

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
