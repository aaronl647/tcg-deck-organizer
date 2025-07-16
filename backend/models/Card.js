const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: String,
  images: {
    small: String,
    large: String,
  },
  // Add any other relevant fields
});

module.exports = mongoose.model('Card', cardSchema);
