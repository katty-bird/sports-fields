import { useState, useEffect } from 'react'
import {
  getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut
} from 'firebase/auth'

const useFirebaseAuth = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const loginUser = async (username, password) => {
    setLoading(true)

    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, username, password)
      setUser(userCredential.user)
    } catch (error) {
      console.error('Error signing in:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const logoutUser = async () => {
    const auth = getAuth()
    await signOut(auth)
    setUser(null)
  }

  return {
    loading, user, loginUser, logoutUser
  }
}

export default useFirebaseAuth
