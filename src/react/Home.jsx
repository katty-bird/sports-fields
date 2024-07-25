import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import LoginForm from './LoginForm'
import useFirebaseAuth from '../hooks/useFirebaseAuth'
import GoogleMap from './GoogleMap'

const Home = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {
    loading, user, loginUser, logoutUser
  } = useFirebaseAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    await loginUser(username, password)
  }

  const handleLogout = async () => {
    await logoutUser()
  }

  useEffect(() => {
    if (user) {
      // navigate('/profile') // Do not navigate automatically after login
    }
  }, [user, navigate])

  if (loading) return <p>Loading...</p>

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: 'calc(100vh - 64px)', // Adjusted to account for the AppBar height
        backgroundColor: '#f1f1f0',
        marginTop: '64px' // Adjusted to account for the AppBar height
      }}
    >
      <div
        style={{
          width: '75%',
          padding: '30px',
          marginBottom: '30px',
          background: '#00C78C',
          borderRadius: '40px',
          textAlign: 'center'
        }}
      >
        <h1>
          Welcome to the SportsFields App
        </h1>
        {user ? (
          <div>
            <Typography variant="h6">
              Welcome,
              {user.displayName || user.email}
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <>
            <h3 style={{ margin: 0 }}>Please login</h3>
            <LoginForm
              username={username}
              password={password}
              onUsernameChange={setUsername}
              onPasswordChange={setPassword}
              onLoginClicked={handleLogin}
            />
          </>
        )}
        {loading && <b>Loading ...</b>}
      </div>
      <div
        style={{
          width: '100%',
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: '70%',
            height: '700px',
            border: '2px solid #ccc',
            borderRadius: '15px',
            overflow: 'scroll',
            boxShadow: '1 20px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <GoogleMap />
        </div>
      </div>
    </div>
  )
}

export default Home
