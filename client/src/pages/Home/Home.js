import React from "react"
import './Home.css'
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();
    
    return (
        <div className="App">
            <header className="App-header">
                <h3  >TCG Deck Organizer</h3>
                <div className="button-group">
                    <div className="custom-button" onClick={() => navigate('/search')}>
                        Search Cards
                    </div>
                     <div className="custom-button" onClick={() => navigate('/deck-creator')}>
                        Add New Deck
                    </div>
                    <div className="custom-button" onClick={() => console.log("View Collection clicked")}>
                        View Collection
                    </div>
                </div>
            </header>
        </div>
    )
}

export default App;