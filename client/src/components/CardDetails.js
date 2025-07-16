import React from 'react';

const CardDetails = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: '#282c34',
        padding: '20px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90%',
        overflowY: 'auto',
        boxShadow: '0 0 12px #000',
      }}>
        <button onClick={onClose} style={{ float: 'right', fontSize: '16px' }}>✖</button>
        <h2>{card.name}</h2>
        <p><strong>HP:</strong> {card.hp}</p>
        <p><strong>Types:</strong> {card.types?.join(', ')}</p>
        <p><strong>Rarity:</strong> {card.rarity}</p>
        <p><strong>Set:</strong> {card.set?.name}</p>
        <img src={card.images?.large || card.images?.small} alt={card.name} style={{ width: '100%', maxWidth: '300px' }} />
        <div>
          <h3>Attacks:</h3>
          {card.attacks?.map((atk, index) => (
            <div key={index}>
              <strong>{atk.name}</strong> — {atk.damage}  
              <p>{atk.text}</p>
            </div>
          )) || <p>No attacks</p>}
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
