// src/components/Home.jsx

import React, { useState } from 'react'
import LoginForm from './LoginForm'
import PersonalAccount from './PersonalAccount'
import useFirebaseAuth from '../hooks/useFirebaseAuth'

const Home2 = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {
    loading, user, loginUser, logoutUser
  } = useFirebaseAuth()

  const handleLogin = () => {
    loginUser(username, password)
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'
    }}
    >
      {user ? (
        <PersonalAccount user={user} onLogout={logoutUser} />
      ) : (
        <>
          <h1>Welcome to the best Auth-App on the internet</h1>
          <div style={{
            width: '66%', padding: '15px', marginBottom: '10px', background: '#89cff0', borderRadius: '15px', textAlign: 'center'
          }}
          >
            <h3>Please login</h3>
            {loading && <b>Loading ...</b>}
          </div>
          <LoginForm
            username={username}
            password={password}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
            onLoginClicked={handleLogin}
          />
        </>
      )}
    </div>
  )
}

export default Home2
