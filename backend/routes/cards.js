const express = require('express');
const axios = require('axios');
const router = express.Router();
const Card = require('../models/Card');

router.get('/search-external', async (req, res) => {
  const q = req.query.q || '';
  if (!q.trim()) {
    return res.status(400).json({ error: 'Query parameter q is required' });
  }

  // Build query string for name only
  const rawQuery = `name:${q}`;
  const url = `https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(rawQuery)}`;

  console.log('➡️ Requesting:', url);

  try {
    const response = await axios.get(url, {
      headers: {
        'X-Api-Key': process.env.POKEMON_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('❌ Error fetching external cards:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    res.status(500).json({ error: 'Failed to fetch cards from external API' });
  }
});

module.exports = router;
