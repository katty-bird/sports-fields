import React from 'react'
import {
  Route, Routes, BrowserRouter
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

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<PersonalAccount user={fakeUser} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/map" element={<GoogleMap />} />
    </Routes>
  </BrowserRouter>
)

export default App
