import React from "react";
import PropTypes from 'prop-types'
import { useState } from "react";

const Card = ({ card }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div key={card.id} style={{ margin: '10px', width: '245px', height: '342px', position: 'relative' }}>
      {!loaded && (
        <div
          style={{
            backgroundColor: '#ddd',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: '8px'
          }}
        >
          <span style={{ display: 'block', textAlign: 'center', lineHeight: '342px' }}>
            Loading...
          </span>
        </div>
      )}
      <img src={card.images.small} 
      alt={card.name} 
      onLoad={() => setLoaded(true)} 
      style={{
          width: '100%',
          height: '100%',
          display: loaded ? 'block' : 'none',
          borderRadius: '8px'
        }}/>
      <p>{card.name}</p>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.shape({
      small: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Card;