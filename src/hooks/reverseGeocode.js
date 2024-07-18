import { useState, useEffect } from 'react'
import { useMapsLibrary } from '@vis.gl/react-google-maps'

const ReverseGeocode = ({ latlong }) => {
  const geocodingLib = useMapsLibrary('geocoding')
  const [geocodingService, setGeocodingService] = useState(null)

  useEffect(() => {
    if (!geocodingLib) return
    setGeocodingService(new geocodingLib.Geocoder())
  }, [geocodingLib])

  useEffect(() => {
    if (!geocodingService) return
    geocodingService
      .geocode({
        location: latlong
        // placeId: 'ChIJWc9EQTZJqEcRTOEDNragDJM'
      })
      .then(response => {
        if (response.results[0]) {
          console.log(response.results[0])
        }
      })
  }, [geocodingService])
}

export default ReverseGeocode
