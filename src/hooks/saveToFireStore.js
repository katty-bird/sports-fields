import { getApp } from 'firebase/app'
import {
  getFirestore, doc, setDoc
} from 'firebase/firestore'

const saveToFireStore = async (
  {
    placeID,
    placeName,
    placeAddress,
    openingHours,
    isOpen,
    placePhoto,
    placeReviews,
    placeRating
  }
) => {
  const db = getFirestore(getApp())
  await setDoc(doc(db, 'sport-fields', placeID), {
    name: placeName,
    address: placeAddress,
    opening_hours: openingHours,
    open_now: isOpen,
    photo: placePhoto,
    reviews: placeReviews,
    rating: placeRating,
    sports: [],
    sanitary: []
  })
}

export default saveToFireStore
