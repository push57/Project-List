import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home';
import PropertyDetail from './PropertyDetail';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Checking the login status 
  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'false') {
      setIsLoggedIn(true);
      navigate('/home');
    }
  }, [navigate]);

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    const sharedUsername = 'push';
    const sharedPassword = 'usernamepush';

    // Validate credentials
    if (username === sharedUsername && password === sharedPassword) {
      setIsLoggedIn(true);
     sessionStorage.setItem('isLoggedIn', 'false');
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="row">
            <label htmlFor="UserName">UserName</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="row">
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className='login'>Login</button>
        </form>
      ) : (
        <Navigate to="/home" />
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/property-details" element={<PropertyDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
