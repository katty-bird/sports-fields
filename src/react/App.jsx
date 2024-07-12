import React from 'react'
import {
  Route, Routes, BrowserRouter, useNavigate
} from 'react-router-dom'
import Home from './Home'
import PersonalAccount from './PersonalAccount'
import GoogleMap from './GoogleMap'

// import useWeather from '../hooks/useWeather'

const fakeUser = {
  displayName: 'fakeUser',
  email: 'fakeUser@example.com',
  photoURL: 'fakeUser',
  jobTitle: 'fakeUser',
  company: 'fakeCompany',
  linkedin: 'fakeLinkedIn',
  twitter: 'fakeTwitter',
  aboutMe: 'fakeAboutMe'
}

const handleLogout = () => {
  useNavigate('/')
  console.log('User logged out')
}

const App = () => (

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<PersonalAccount user={fakeUser} onLogout={handleLogout} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/map" element={<GoogleMap />} />
    </Routes>
  </BrowserRouter>
)

export default App
