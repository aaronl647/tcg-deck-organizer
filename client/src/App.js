import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card'


function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
  axios.get('http://localhost:3000/api/cards')
    .then(res => setCards(res.data.data))
    .catch(err => console.error(err));
}, []);

  return (
    <div className="App">
      <header className="App-header">
        <h3>TCG Deck Organizer</h3>
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
