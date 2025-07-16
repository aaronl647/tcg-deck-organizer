import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card';
import CardDetails from './components/CardDetails';


function App() {
  const [cards, setCards] = useState([]);
  const [query, setQuery] = useState('');

  const [selectedCard, setSelectedCard] = useState(null);


  useEffect(() => {
    if (!query.trim()) {
      setCards([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      axios
        .get(`http://localhost:3001/api/cards/search-external?q=${encodeURIComponent(query)}`)
        .then(res => setCards(res.data.data || []))
        .catch(err => console.error(err));
    }, 500);

    return () => clearTimeout(delayDebounce);
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
          {cards.length > 0 ? (
            cards.map((card) => (
              <div key={card.id} onClick={() => setSelectedCard(card)}>
                <Card card={card} />
              </div>
            ))
          ) : (
            query && <p style={{ color: '#ccc' }}>No cards found.</p>
          )}
        </div>
        <CardDetails card={selectedCard} onClose={() => setSelectedCard(null)} />

      </header>
    </div>
  );
}

export default App;