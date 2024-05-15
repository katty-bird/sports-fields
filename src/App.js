import React, { useState} from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    if (name.trim()) {
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setName('')
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
