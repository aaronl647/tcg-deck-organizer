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
                        Add Decks
                    </div>
                    <div className="custom-button" onClick={() => console.log("View Decks clicked")}>
                        View Decks
                    </div>

                    <div className="custom-button" onClick={() => console.log("View Cards clicked")}>
                        View Cards
                    </div>
                </div>
            </header>
        </div>
    )
}

export default App;