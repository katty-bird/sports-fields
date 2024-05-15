import React, { useState} from 'react';
import { Home as HomeIcon } from '@mui/icons-material';
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
        <HomeIcon className="home-icon" />
        {isLoggedIn && <h1>Hello, {name}!</h1>}
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      </header>
      <main className="App-body">
        {!isLoggedIn ? (
          <div> 
            <input 
              type="text" 
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          
          <p>Please Login</p>
          </div>
        ) : (
          <div className="welcome">
            <p>Hey there <strong>{name}</strong>, great that you are here. Let me show you around and tell you what you can do in the App.</p>
          </div>
        )}
      </main>
    </div> 
  )
}

export default App;
