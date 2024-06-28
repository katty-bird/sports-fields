import React from 'react'
import ReactDOM from 'react-dom/client'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import Home2 from './react/Home2'

const firebaseConfig = {
  apiKey: 'AIzaSyDyoKt9RQZzU-MTOYvhTjdpw2Pgp5Zp6wA',
  authDomain: 'mhealth-7f01c.firebaseapp.com',
  projectId: 'mhealth-7f01c',
  storageBucket: 'mhealth-7f01c.appspot.com',
  messagingSenderId: '927986505231',
  appId: '1:927986505231:web:6b19e3872788842a6e357a'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

const rootDomElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootDomElement)

// We use createElement to make this a pure JavaScript file,
// because we don't like JSX in our .js files ;)
root.render(React.createElement(Home2))

export default db
