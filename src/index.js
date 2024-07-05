import React from 'react'
import ReactDOM from 'react-dom/client'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import App from './react/App'

const firebaseConfig = {
  apiKey: 'AIzaSyD8NZgF92WRKE4tU25DvyfGKkR_xezQq-c',
  authDomain: 'sportsfields-8822f.firebaseapp.com',
  projectId: 'sportsfields-8822f',
  storageBucket: 'sportsfields-8822f.appspot.com',
  messagingSenderId: '676783363875',
  appId: '1:676783363875:web:0b91c585d679883b791e96'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

const rootDomElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootDomElement)

// We use createElement to make this a pure JavaScript file,
// because we don't like JSX in our .js files ;)
root.render(React.createElement(App))

export default db
