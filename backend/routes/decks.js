const express = require('express');
const router = express.Router();
const Deck = require('../models/Deck');

router.post('/', async (req, res) => {
  try {
    const { name, description, cards } = req.body;
    const newDeck = new Deck({ name, description, cards });
    await newDeck.save();
    res.status(201).json(newDeck);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create deck' });
  }
});

module.exports = router;
