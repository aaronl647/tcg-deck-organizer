import React, { useState, useEffect } from 'react';
import './SearchInput.css';

function SearchInput({ query, setQuery, allNames }) {
  const [suggestions, setSuggestions] = useState([]);

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
    <div className="search-container">
      <input
        type="text"
        placeholder="Search cards..."
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((name, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(name)}
              className="suggestion-item"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;
