import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDeckForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cardArray = cards.split(',').map(card => card.trim());
      const response = await axios.post('/api/decks', { name, description, cards: cardArray });
      console.log('Deck added:', response.data);
      setName('');
      setDescription('');
      setCards('');
    } catch (error) {
      console.error('Error adding deck:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3 onClick={() => navigate('/')}>TCG Deck Organizer</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Deck name" value={name} onChange={e => setName(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="text" placeholder="Cards (comma-separated)" value={cards} onChange={e => setCards(e.target.value)} />
        <button type="submit">Add Deck</button>
      </form>
      </header>
    </div>
  );
};

export default AddDeckForm;
