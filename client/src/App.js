import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card'


function App() {
  const [cards, setCards] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/api/cards/search-external?q=${encodeURIComponent(query)}`)
      .then(res => setCards(res.data.data))
      .catch(err => console.error(err));
  }, [query]);

  return (
    <div className="App">
      <header className="App-header">
        <h3>TCG Deck Organizer</h3>
        <input
          type="text"
          placeholder="Search cards..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px', fontSize: '16px', marginBottom: '20px' }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {cards.map(card => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
