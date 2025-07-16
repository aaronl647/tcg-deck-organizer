const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.pokemontcg.io/v2/cards?q=name:pikachu', {
      headers: {
        'X-Api-Key': process.env.POKEMON_API_KEY,
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error fetching cards:', error.message);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

module.exports = router;
