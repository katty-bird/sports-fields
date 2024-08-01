import { getApp } from 'firebase/app'
import {
  getFirestore, doc, updateDoc, arrayUnion
} from 'firebase/firestore'

const updateFieldFirestore = async (
  {
    placeID,
    fieldName,
    fieldValue
  }
) => {
  const db = getFirestore(getApp())
  // console.log(placeID, fieldName, fieldValue)
  const fieldRef = doc(db, 'sport-fields', placeID)
  await updateDoc(fieldRef, {
    [fieldName]: arrayUnion(fieldValue)
  })
}

export default updateFieldFirestore
