import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import SearchPage from './pages/SearchPage/SearchPage';
import Home from './pages/Home/Home';
import AddDeckForm from './components/AddDeckForm/AddDeckForm';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';

function App() {
  const token = localStorage.getItem('token');
  let userId = null;

   if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.userId;  // Adjust if your token uses a different key name
    } catch (error) {
      console.error('Failed to decode token:', error);
      // Optionally clear invalid token
      // localStorage.removeItem('token');
    }
  }

  const isAuthenticated = !!token;


  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/search" element={isAuthenticated ? <SearchPage /> : <Navigate to="/login" replace />} />
      <Route path="/deck-creator" element={isAuthenticated ? <AddDeckForm userId={userId} /> : <Navigate to="/login" replace />} />
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


