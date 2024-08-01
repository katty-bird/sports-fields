import React, { useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './Home'
import PersonalAccount from './PersonalAccount'
import useFirebaseAuth from '../hooks/useFirebaseAuth'
import TopBar from './TopBar'
import FavouritePlaces from './FavouritePlaces'

const App = () => {
  const { user, logoutUser } = useFirebaseAuth()
  const [selectedReview, setSelectedReview] = useState(null) // Shared State

  const handleLogout = async () => {
    await logoutUser()
  }

  return (
    <BrowserRouter>
      <TopBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={user} onLogout={handleLogout} selectedReview={selectedReview} setSelectedReview={setSelectedReview} />} />
        <Route path="/profile" element={<PersonalAccount user={user} onLogout={handleLogout} />} />
        <Route path="/my-reviews" element={<FavouritePlaces selectedReview={selectedReview} setSelectedReview={setSelectedReview} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
