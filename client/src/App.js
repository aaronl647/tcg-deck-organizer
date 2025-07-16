import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_POKEMON_API_KEY;

function App() {
    const [cards, setCards] = useState([]);
    
    useEffect(() => {
    axios.get('https://api.pokemontcg.io/v2/cards?q=name:charizard', {
      headers: {
        'X-Api-Key': apiKey
      }
    })
    .then(response => {
      console.log(response);
      setCards(response.data.data); // data.data because of the API response structure
    })
    .catch(error => {
      console.error('Error fetching cards:', error);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h3>TCG Deck Organizer</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cards.map(card => (
          <div key={card.id} style={{ margin: '10px' }}>
            <img src={card.images.small} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
      </header>
    </div>
  );
}

export default App;
