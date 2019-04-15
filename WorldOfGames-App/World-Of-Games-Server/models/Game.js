const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  genre: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  year: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  image: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  trailer: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
