const express = require('express');
const router = express.Router();
const Deck = require('../models/Deck');
const Card = require('../models/Card')

// POST user decks
router.post('/', async (req, res) => {
  const { userId, name, cards } = req.body;

  if (!userId || !name || !cards) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const newDeck = new Deck({ userId, name, cards });
    await newDeck.save();
    res.status(201).json({ message: 'Deck saved successfully' });
  } catch (error) {
    console.error('Error saving deck:', error);
    res.status(500).json({ error: 'Failed to save deck' });
  }
});

// GET all decks
router.get('/', async (req, res) => {
  try {
    const decks = await Deck.find(); // optionally filter by user
    res.json(decks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch decks' });
  }
});


module.exports = router;