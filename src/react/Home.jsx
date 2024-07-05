import React, { useState } from 'react'
import LoginForm from './LoginForm'
import useFirebaseAuth from '../hooks/useFirebaseAuth'
import GoogleMap from './GoogleMap'

// import useWeather from '../hooks/useWeather'

const Home = () => {
  const [username, setUsername] = useState('')
  const [password, setPassord] = useState('')

  const { loading, user, loginUser } = useFirebaseAuth()

  const handleLogin = () => {
    loginUser(username, password)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >

      <div
        style={{
          width: '100%',
          padding: '15px',
          marginBottom: '10px',
          background: '#89cff0',
          borderRadius: '15px',
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
          loading
            && <b>Loading ...</b>
        }
        {/* {
          !loading
            && <WeatherGraph weather={weather} />
        } */}
      </div>
      <LoginForm
        username={username}
        password={password}
        onUsernameChange={setUsername}
        onPasswordChange={setPassord}
        onLoginClicked={handleLogin}
      />
      <div style={{ width: '100%', marginTop: '20px' }}>
        <GoogleMap />
      </div>
    </div>
  )
}

export default Home
