import React, { useState, useEffect } from 'react'
import { getApp } from 'firebase/app'
import {
  query, where, getDocs, limit, collectionGroup, getFirestore
} from 'firebase/firestore'
import { Skeleton } from '@mui/material'
import InfoPage from './InfoPage'

const Home = () => {
  const [sportfield, setSportfield] = useState(null)

  useEffect(() => {
    const getSportFieldData = async () => {
      const db = getFirestore(getApp())
      const sportfieldCollectionRef = collectionGroup(db, 'sport-fields')
      const q = query(
        sportfieldCollectionRef,
        where('name', '==', 'Sample Football Field'),
        limit(1)
      )
      const querySnapshot = await getDocs(q)
      const selectedSportField = querySnapshot.docs[0].data()
      setSportfield(selectedSportField)
    }

    getSportFieldData()
  }, [])

  return (
    <div>
      {sportfield ? (
        <InfoPage sportfield={sportfield} />
      ) : (
        <Skeleton variant="text" />
      )}
    </div>
  )
}

export default Home
