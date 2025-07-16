import React from 'react';
import './CardDetails.css';

const CardDetails = ({ card, onClose, cards, selectedIndex, setSelectedCard  }) => {
    if (!card) return null;

    const stopPropagation = (e) => e.stopPropagation();

    const goPrev = () => {
    if (selectedIndex > 0) {
      setSelectedCard(cards[selectedIndex - 1]);
    }
  };

  const goNext = () => {
    if (selectedIndex < cards.length - 1) {
      setSelectedCard(cards[selectedIndex + 1]);
    }
  };


    return (
        <div className="card-details-backdrop" onClick={onClose}>
            <div className="card-details-modal" onClick={stopPropagation}>
                <button className="card-details-close-btn" onClick={onClose} aria-label="Close">✖</button>
                <button
          className="nav-btn left-btn"
          onClick={goPrev}
          disabled={selectedIndex === 0}
          aria-label="Previous card"
        >←</button>

        <button
          className="nav-btn right-btn"
          onClick={goNext}
          disabled={selectedIndex === cards.length - 1}
          aria-label="Next card"
        >→</button>
                <img
                    className="card-details-image"
                    src={card.images?.large || card.images?.small}
                    alt={card.name}
                />
                <div className="card-details-info">
                    <h2>{card.name}</h2>
                    <p><strong>HP:</strong> {card.hp}</p>
                    <p><strong>Types:</strong> {card.types?.join(', ')}</p>
                    <p><strong>Rarity:</strong> {card.rarity}</p>
                    <p><strong>Set:</strong> {card.set?.name}</p>
                    <div className="card-details-attacks">
                        <h3>Attacks:</h3>
                        {card.attacks?.length ? (
                            card.attacks.map((atk, index) => (
                                <div key={index}>
                                    <strong>{atk.name}</strong> — {atk.damage}
                                    <p>{atk.text}</p>
                                </div>
                            ))
                        ) : (
                            <p>No attacks</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;
