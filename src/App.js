import React, { useState } from 'react';
import { Home as HomeIcon } from '@mui/icons-material';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
      setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <HomeIcon className="home-icon" />
        {!isLoggedIn && (
          <>
            <input
              type="text"
              placeholder="Enter your name here"
              value={name}
              onChange={e => setName(e.target.value)}
              className="name-input"
            />
            <button onClick={handleLogin} className="login-button">Login</button>
          </>
        )}
        {isLoggedIn && (
          <>
            <h1>Hello, {name}!</h1>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        )}
      </header>
      <main className="App-body">
        {!isLoggedIn ? (
          <div className="login-container">
            <p className="login-text">Please Login</p>
          </div>
        ) : (
          <div className="welcome-container">
            <p>Hey there <strong>{name}</strong>, great that you are here. Let me show you around and tell you what you can do in the App.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
