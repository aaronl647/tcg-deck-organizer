import { useState } from 'react';
import axios from 'axios';

export default function AddDeckForm({ userId }) {
  const [deckText, setDeckText] = useState('');
  const [uploading, setUploading] = useState(false);

  const parseDeck = (text) => {
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    const cards = [];

    let section = null;

    for (const line of lines) {
      if (line.startsWith('Pokémon')) section = 'pokemon';
      else if (line.startsWith('Trainer')) section = 'trainer';
      else if (line.startsWith('Energy')) section = 'energy';
      else if (line.match(/^\d+\s/)) {
        const match = line.match(/^(\d+)\s(.+?)\s([A-Z]+)\s(\d+)$/);
        if (match) {
          const [, count, name, setCode, setNumber] = match;
          cards.push({
            name,
            setCode,
            setNumber,
            count: parseInt(count),
            category: section,
          });
        }
      }
    }

    return cards;
  };

  const handleUpload = async () => {
    setUploading(true);
    const cards = parseDeck(deckText);

    try {
      const response = await axios.post('http://localhost:3001/api/decks', {
        userId,
        name: 'Imported Deck',
        cards, 
      });

      alert('Deck uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload deck.');
    }

    setUploading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Upload Deck</h2>
      <textarea
        value={deckText}
        onChange={(e) => setDeckText(e.target.value)}
        rows={15}
        className="w-full border p-2 rounded"
        placeholder="Paste deck list here..."
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {uploading ? 'Uploading...' : 'Upload Deck'}
      </button>
    </div>
  );
}