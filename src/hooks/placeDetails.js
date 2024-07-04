import { useState, useEffect } from 'react'
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps'

// eslint-disable-next-line react/prop-types
const PlaceDetails = ({
  placeIdInput,
  setPlaceName,
  setPlaceAddress,
  setPlaceOpeningHours,
  setPlaceRating,
  setPlaceIsOpen,
  setPlacePhoto,
  setPlaceReviews
}) => {
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
        // console.log(place.reviews)
        setPlaceName(place.name)
        setPlaceAddress(place.formatted_address)
        setPlaceOpeningHours(place.current_opening_hours.weekday_text)
        setPlaceRating(place.rating)
        setPlaceIsOpen(place.current_opening_hours.open_now)
        setPlacePhoto(place.photos[0])
        setPlaceReviews(place.reviews)
      }
    })
  })
}

export default PlaceDetails
