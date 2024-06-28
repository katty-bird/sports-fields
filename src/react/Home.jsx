import React, { useState, useEffect } from 'react'

import {
  query, where, getDocs, limit, collectionGroup
} from 'firebase/firestore'
import { Skeleton } from '@mui/material'
import InfoPage from './InfoPage'
// eslint-disable-next-line import/no-cycle
import db from '../index'

const Home = () => {
  const [sportfield, setSportfield] = useState(null)

  const sportfieldCollectionRef = collectionGroup(db, 'sport-fields')

  useEffect(() => {
    const getSportFieldData = async () => {
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
