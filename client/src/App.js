import './App.css';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage/SearchPage'
import Home from './pages/Home/Home';

function App() {
  

  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        {/* <Route path="/deck-creator" element={<DeckCreatorPage />} /> */}
      </Routes>
  );
}

export default App;