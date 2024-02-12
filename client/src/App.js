import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'

function App() {
  const [message, setMessage] = useState("");

  // Fetching message from backend on mount
  useEffect(() => {
    fetch("https://test-backend-xt6n.onrender.com")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <Home /> : <Navigate to='/login' />}
            /> 
              <Route 
              path="/login"
              element={!user ? <Login /> : <Home /> }
            />
              <Route 
              path="/signup"
              element={!user ? <Signup /> : <Home />}
            />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;