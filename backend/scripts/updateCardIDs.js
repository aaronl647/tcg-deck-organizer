const mongoose = require('mongoose');
const path = require('path');

// Adjust path to model relative to this file
const Deck = require(path.join(__dirname, '../models/Deck'));

async function updateCardIds() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const decks = await Deck.find({});
    console.log(`📦 Found ${decks.length} decks`);

    let totalCardsUpdated = 0;

    for (const deck of decks) {
      let updated = false;

      for (const card of deck.cards) {
        if (!card.cardId && card.setCode && card.setNumber) {
          card.cardId = `${card.setCode}-${card.setNumber}`;
          updated = true;
          totalCardsUpdated++;
        }
      }

      if (updated) {
        await deck.save();
        console.log(`✅ Updated deck: "${deck.name}"`);
      }
    }

    console.log(`🎉 Done! Updated ${totalCardsUpdated} cards.`);
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

updateCardIds();