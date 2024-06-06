import React, { useState, useEffect } from 'react'
import { Home as HomeIcon } from '@mui/icons-material'
import './App.css'
import { initializeApp } from 'firebase/app'
import {
  getAuth, onAuthStateChanged, signInAnonymously, signOut, updateProfile
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDw81iy0kEnwv-6VjiBRAEzuAmw5d_Df1k',
  authDomain: 'majdapp97.firebaseapp.com',
  projectId: 'majdapp97',
  storageBucket: 'majdapp97.appspot.com',
  messagingSenderId: '254880577908',
  appId: '1:254880577908:web:bb6db8ca9398e3d85421',
  measurementId: 'G-1SBN3HJQTV'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const App = () => {
  const [name, setName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true)
        setName(user.displayName || '')
      } else {
        setIsLoggedIn(false)
        setName('')
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    const userCredential = await signInAnonymously(auth)
    await updateProfile(userCredential.user, {
      displayName: name
    })
    setIsLoggedIn(true)
    setName(name)
  }

  const handleLogout = async () => {
    await signOut(auth)
    setIsLoggedIn(false)
    setName('')
  }

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
          <button type="button" onClick={handleLogin} className="login-button">Login</button>
        </>
        )}
        {isLoggedIn && (
        <>
          <h1>
            Hello,
            {' '}
            {name}
            !
          </h1>
          <button type="button" onClick={handleLogout} className="logout-button">Logout</button>
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
            <p>
              Hey there
              {' '}
              <strong>{name}</strong>
              , great that you are here.
              Let me show you around and tell you what you can do in the App.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
