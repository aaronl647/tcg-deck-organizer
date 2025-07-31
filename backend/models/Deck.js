const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: String,
  setCode: String,
  setNumber: String,
  count: Number,
  category: String, // 'pokemon', 'trainer', 'energy'
});

const deckSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  cards: [cardSchema],
}, { timestamps: true });

module.exports = mongoose.model('Deck', deckSchema);