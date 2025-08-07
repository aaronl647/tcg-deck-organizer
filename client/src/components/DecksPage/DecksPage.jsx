import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DecksPage = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/decks');
        setDecks(response.data);
      } catch (error) {
        console.error('Error fetching decks:', error);
      }
    };

    fetchDecks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Your Saved Decks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {decks.map((deck) => (
          <div key={deck._id} className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-blue-600">{deck.name}</h2>
            <p className="text-sm text-gray-500">{deck.cards?.length || 0} cards</p>
            {/* Optional preview */}
            {deck.cards?.slice(0, 61).map((card, index) => (
              <p key={index} className="text-gray-700 text-sm truncate">• {card.name}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecksPage;