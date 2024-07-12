import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './Home'
import PersonalAccount from './PersonalAccount'
import GoogleMap from './GoogleMap'
import useFirebaseAuth from '../hooks/useFirebaseAuth'

const App = () => {
  const { user, logoutUser } = useFirebaseAuth()

  const handleLogout = async () => {
    await logoutUser()
    // Handle any additional state updates or logic here
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<PersonalAccount user={user} onLogout={handleLogout} />} />
        <Route path="/map" element={<GoogleMap />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
