const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: String,
  setCode: String,
  setNumber: String,
  cardId: String,
  count: Number,
  category: String, // 'pokemon', 'trainer', 'energy'
  imageUrl: String,
});


const deckSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  cards: [cardSchema],
}, { timestamps: true });

deckSchema.pre('save', function (next) {
  this.cards.forEach(card => {
    if (card.setCode && card.setNumber) {
      card.cardId = `${card.setCode}-${card.setNumber}`;
      card.imageUrl = `https://images.pokemontcg.io/${card.setCode}/${card.setNumber}.png`;
    }
  });
  next();
});

module.exports = mongoose.model('Deck', deckSchema);