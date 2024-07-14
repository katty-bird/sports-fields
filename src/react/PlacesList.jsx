/* eslint-disable no-dupe-keys */
import { useEffect } from 'react'
import { useMapsLibrary } from '@vis.gl/react-google-maps'

const PlacesList = ({ setPlaces }) => {
  const placesLibrary = useMapsLibrary('places')

  const request = {
    fields: [
      'id',
      'formattedAddress',
      'displayName',
      'hasOutdoorSeating',
      'hasRestroom',
      'hasWiFi',
      'location',
      'photos',
      'rating',
      'regularOpeningHours',
      'reviews'
    ],
    includedTypes: ['sports_complex', 'athletic_field'],
    locationRestriction: {
      center: { lat: 52.45736432616367, lng: 13.519293310710195 },
      radius: 1000.0
    }
  }

  useEffect(() => {
    const run = async () => {
      if (!placesLibrary) return
      const results = await placesLibrary.Place.searchNearby(request)
      const placesArray = results.places
      const egList = placesArray.map(result => result.Eg)
      // console.log(egList)
      setPlaces(egList)
    }
    run()
  }, [placesLibrary])
}

export default PlacesList
