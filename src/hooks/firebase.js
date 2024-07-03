import { getFirestore } from 'firebase/firestore'
import { getApp } from 'firebase/app'

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(getApp())
