import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import useFirebaseAuth from '../hooks/useFirebaseAuth'
import GoogleMap from './GoogleMap'

const Home = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { loading, user, loginUser } = useFirebaseAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    await loginUser(username, password)
  }

  useEffect(() => {
    if (user) {
      navigate('/profile') // Navigate to profile page after successful login
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
        minHeight: '100vh',
        backgroundColor: '#f1f1f0'
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
          {user?.email}
        </h1>
        <h3 style={{ margin: 0 }}>
          Please login
        </h3>
        {
          loading && <b>Loading ...</b>
        }
      </div>
      <LoginForm
        username={username}
        password={password}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onLoginClicked={handleLogin}
      />
      <div style={{
        width: '100%', marginTop: '30px', display: 'flex', justifyContent: 'center'
      }}
      >
        <div style={{
          width: '70%',
          height: '700px',
          border: '2px solid #ccc',
          borderRadius: '15px',
          overflow: 'hidden',
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
