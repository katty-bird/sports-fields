import { useState, useEffect } from 'react'
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps'

// eslint-disable-next-line react/prop-types
const PlaceDetails = ({ placeIdInput = 'ChIJWc9EQTZJqEcRTOEDNragDJM' }) => {
  const map = useMap()
  const placesLibrary = useMapsLibrary('places')
  const [placesService, setPlacesService] = useState()

  useEffect(() => {
    if (!placesLibrary || !map) return
    setPlacesService(new placesLibrary.PlacesService(map))
  }, [placesLibrary, map])

  const request = {
    placeId: placeIdInput
  }

  useEffect(() => {
    if (!placesService) return
    placesService.getDetails(request, (place, status) => {
      if (status === placesLibrary.PlacesServiceStatus.OK) {
        console.log(place)
      }
    })
  })
}

export default PlaceDetails
