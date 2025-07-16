const express = require('express');
const axios = require('axios');
const router = express.Router();
const Card = require('../models/Card');


router.get('/search-external', async (req, res) => {
  const searchQuery = req.query.q || ''; // get search query from ?q= in URL

  try {
    const response = await axios.get(`https://api.pokemontcg.io/v2/cards?q=name:${searchQuery}`, {
      headers: {
        'X-Api-Key': process.env.POKEMON_API_KEY, // your API key from env variables
      },
    });

    res.json(response.data); // send back the whole API response
  } catch (error) {
    console.error('❌ Error fetching external cards:', error.message);
    res.status(500).json({ error: 'Failed to fetch cards from external API' });
  }
});

module.exports = router;



// router.get('/', async (req, res) => {
//   const searchQuery = req.query.search || '';

//   try {
//     const cards = await Card.find({
//       name: { $regex: searchQuery, $options: 'i' }, // case-insensitive search
//     });
//     res.json({ data: cards });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

