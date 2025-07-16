import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card/Card';
import CardDetails from './components/CardDetails/CardDetails';
import SearchInput from './components/SearchInput/SearchInput';


function App() {
  const [cards, setCards] = useState([]);
  const [query, setQuery] = useState('');
  const [allNames, setAllNames] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
  axios.get('http://localhost:3001/api/cards/all-names')
    .then(res => setAllNames(res.data.names))
    .catch(err => console.error('Error fetching all names:', err));
}, []);

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

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = allNames
      .filter(name => name.toLowerCase().startsWith(input.toLowerCase()))
      .slice(0, 10);

    setSuggestions(filtered);
  };

  const handleSuggestionClick = (name) => {
    setQuery(name);
    setSuggestions([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>TCG Deck Organizer</h3>
       <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
          <SearchInput query={query} setQuery={setQuery} allNames={allNames} />
        </div>
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
        <CardDetails
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          cards={cards}
          selectedIndex={
            cards.findIndex(c => c.id === selectedCard?.id
            )}
          setSelectedCard={setSelectedCard} />

      </header>
    </div>
  );
}

export default App;