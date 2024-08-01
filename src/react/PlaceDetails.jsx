import { useState, useEffect } from 'react'
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps'
import { getApp } from 'firebase/app'
import {
  getFirestore, doc, getDoc
} from 'firebase/firestore'
import getDataFromPlaces from '../hooks/getDataFromPlaces'

// eslint-disable-next-line react/prop-types
const PlaceDetails = ({
  placeIdInput,
  setPlaceName,
  setPlaceAddress,
  setPlaceOpeningHours,
  setPlaceRating,
  setPlaceIsOpen,
  setPlacePhoto,
  setPlaceReviews,
  setPlaceSportsInfo,
  setPlaceSanitaryInfo
}) => {
  const map = useMap()
  const placesLibrary = useMapsLibrary('places')
  const [placesService, setPlacesService] = useState()

  useEffect(() => {
    if (placesLibrary && map) {
      setPlacesService(new placesLibrary.PlacesService(map))
    }
  }, [placesLibrary, map])

  useEffect(() => {
    const getSportFieldData = async () => {
      const db = getFirestore(getApp())
      const docRef = doc(db, 'sport-fields', placeIdInput)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        setPlaceName(data.name ?? 'Unknown Name')
        setPlaceAddress(data.address ?? 'Unknown Address')
        setPlaceOpeningHours(data.opening_hours ?? [])
        setPlaceRating(data.rating ?? null)
        setPlaceIsOpen(data.open_now ?? null)
        setPlacePhoto(data.photo ?? null)
        setPlaceReviews(data.reviews ?? [])
        setPlaceSportsInfo(data.sports ?? [])
        console.log(data.sports)
        setPlaceSanitaryInfo(data.sanitary ?? [])
      } else {
        getDataFromPlaces(
          placeIdInput,
          setPlaceName,
          setPlaceAddress,
          setPlaceOpeningHours,
          setPlaceRating,
          setPlaceIsOpen,
          setPlacePhoto,
          setPlaceReviews,
          setPlaceSportsInfo,
          setPlaceSanitaryInfo,
          placesService,
          placesLibrary
        )
      }
    }
    getSportFieldData()
  }, [placesService])
}

export default PlaceDetails
