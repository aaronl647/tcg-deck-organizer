import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import SearchPage from './pages/SearchPage/SearchPage';
import Home from './pages/Home/Home';
import AddDeckForm from './components/AddDeckForm/AddDeckForm';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';

function App() {
  const isAuthenticated = !!localStorage.getItem('token'); // basic auth check

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/search" element={isAuthenticated ? <SearchPage /> : <Navigate to="/login" replace />} />
      <Route path="/deck-creator" element={isAuthenticated ? <AddDeckForm /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;



// import './App.css';
// import { Routes, Route } from 'react-router-dom';
// import SearchPage from './pages/SearchPage/SearchPage'
// import Home from './pages/Home/Home';
// import AddDeckForm from './components/AddDeckForm/AddDeckForm';
// import LoginPage from './pages/LoginPage';

// function App() {
  
//   return (
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path="/search" element={<SearchPage />} />
//         <Route path="/deck-creator" element={<AddDeckForm />} />
//       </Routes>
//   );
// }

// export default App;


