// ../hooks/useFirebaseAuth.js

import { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

const useFirebaseAuth = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // Initialize Firebase app if not already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyD8NZgF92WRKE4tU25DvyfGKkR_xezQq-c',
      authDomain: 'sportsfields-8822f.firebaseapp.com',
      projectId: 'sportsfields-8822f',
      storageBucket: 'sportsfields-8822f.appspot.com',
      messagingSenderId: '676783363875',
      appId: '1:676783363875:web:0b91c585d679883b791e96'
    })
  }

  // Handle login
  const loginUser = (username, password) => {
    setLoading(true)
    firebase.auth().signInWithEmailAndPassword(username, password)
      .then(userCredential => {
        setUser(userCredential.user)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error logging in:', error)
        setLoading(false)
      })
  }

  // Handle logout
  const logoutUser = () => {
    firebase.auth().signOut()
      .then(() => {
        setUser(null)
      })
      .catch(error => {
        console.error('Error logging out:', error)
      })
  }

  // Check authentication state on mount
  // eslint-disable-next-line no-shadow
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
    setLoading(false)
  })

  return {
    loading, user, loginUser, logoutUser
  }
}

export default useFirebaseAuth
