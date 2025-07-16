const express = require('express');
const axios = require('axios');
const router = express.Router();
const Card = require('../models/Card');

let cachedNames = null;

router.get('/all-names', async (req, res) => {
  if (cachedNames) {
    return res.json({ names: cachedNames });
  }

  try {
    const allNames = new Set();
    let page = 1;
    const pageSize = 250;
    const maxPages = 10;

    while (page <= maxPages) {
      const response = await axios.get('https://api.pokemontcg.io/v2/cards', {
        params: {
          page,
          pageSize,
          select: 'name',
        },
        headers: {
          'X-Api-Key': process.env.POKEMON_API_KEY,
        },
      });

      const cards = response.data.data;
      if (!cards.length) break;

      cards.forEach(card => allNames.add(card.name));
      page++;
    }

    cachedNames = Array.from(allNames); // Cache it
    res.json({ names: cachedNames });
  } catch (error) {
    console.error('❌ Error fetching all card names:', error.message);
    res.status(500).json({ error: 'Failed to fetch card names' });
  }
});

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
