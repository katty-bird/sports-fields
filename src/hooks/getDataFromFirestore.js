import { useEffect } from 'react'
import { getApp } from 'firebase/app'
import {
  query, where, getDocs, limit, collectionGroup, getFirestore
} from 'firebase/firestore'

const getDataFromFirestore = ({ setSportfield }) => {
  useEffect(() => {
    const getSportFieldData = async () => {
      const db = getFirestore(getApp())
      const sportfieldCollectionRef = collectionGroup(db, 'sport-fields')
      const q = query(
        sportfieldCollectionRef,
        where('pluscode', '==', 'FG6P+9W Berlin'),
        // where('name', '==', 'Sample Football Field'),
        limit(1)
      )
      const querySnapshot = await getDocs(q)
      const selectedSportField = querySnapshot.docs[0].data()
      setSportfield(selectedSportField)
    }
    getSportFieldData()
  }, [])
}

export default getDataFromFirestore
