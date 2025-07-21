const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  cards: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Deck', DeckSchema);
