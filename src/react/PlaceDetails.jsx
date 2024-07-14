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
    const run = async () => {
      if (!placesLibrary || !map) return
      setPlacesService(new placesLibrary.PlacesService(map))
    }
    run()
  }, [placesLibrary, map])

  const request = {
    placeId: placeIdInput
  }

  useEffect(() => {
    if (!placesService) return
    placesService.getDetails(request, (place, status) => {
      if (status === placesLibrary.PlacesServiceStatus.OK) {
        setPlaceName(place.name ?? 'Unknown Name')
        setPlaceAddress(place.formatted_address ?? 'Unknown Address')
        setPlaceOpeningHours(place.current_opening_hours?.weekday_text ?? [])
        setPlaceRating(place.rating ?? null)
        setPlaceIsOpen(place.current_opening_hours?.open_now ?? null)
        setPlacePhoto(place.photos?.[0] ?? null)
        setPlaceReviews(place.reviews ?? [])
      }
    })
  }, [placesService])
}

export default PlaceDetails
