const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  id: String,
  name: String,
  supertype: String,
  subtypes: [String],            // array of strings
  hp: String,                   // sometimes number as string
  types: [String],              // array of types e.g. ['Electric']
  evolvesFrom: String,
  evolvesTo: [String],
  abilities: [
    {
      name: String,
      text: String,
      type: String,
    }
  ],
  attacks: [
    {
      name: String,
      cost: [String],
      convertedEnergyCost: Number,
      damage: String,
      text: String,
    }
  ],
  weaknesses: [
    {
      type: String,
      value: String,
    }
  ],
  resistances: [
    {
      type: String,
      value: String,
    }
  ],
  retreatCost: [String],
  convertedRetreatCost: Number,
  set: {
    id: String,
    name: String,
    series: String,
    printedTotal: Number,
    total: Number,
    legalities: {
      unlimited: String,
      standard: String,
      expanded: String,
    },
    releaseDate: String,
    updatedAt: String,
    images: {
      symbol: String,
      logo: String,
    }
  },
  number: String,
  artist: String,
  rarity: String,
  nationalPokedexNumbers: [Number],
  legalities: {
    unlimited: String,
    standard: String,
    expanded: String,
  },
  images: {
    small: String,
    large: String,
  },
  tcgplayer: {
    url: String,
    prices: {
      holofoil: {
        low: Number,
        mid: Number,
        high: Number,
        market: Number,
        directLow: Number,
      },
      reverseHolofoil: {
        low: Number,
        mid: Number,
        high: Number,
        market: Number,
        directLow: Number,
      }
    }
  },
  cardmarket: {
    url: String,
    prices: {
      averageSellPrice: Number,
      lowPrice: Number,
      trendPrice: Number,
      reverseHoloSell: Number,
      avg1: Number,
      avg7: Number,
      avg30: Number,
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);
