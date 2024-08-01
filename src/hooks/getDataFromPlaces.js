import saveToFireStore from './saveToFireStore'

const getDataFromPlaces = async (
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
) => {
  const request = {
    placeId: placeIdInput,
    fields: [
      'formatted_address',
      'name',
      'photos',
      'rating',
      'current_opening_hours',
      'reviews'
    ]
  }
  if (!placesService) {
    return
  }
  await placesService.getDetails(request, (place, status) => {
    if (status === placesLibrary.PlacesServiceStatus.OK) {
      saveToFireStore({
        placeID: placeIdInput,
        placeName: place.name ?? 'Unknown Name',
        placeAddress: place.formatted_address ?? 'Unknown Address',
        openingHours: place.current_opening_hours?.weekday_text ?? [],
        isOpen: place.current_opening_hours?.open_now ?? null,
        placePhoto: place.photos?.[0].getUrl() ?? null,
        placeReviews: place.reviews ?? [],
        placeRating: place.rating ?? null
      })
      setPlaceName(place.name ?? 'Unknown Name')
      setPlaceAddress(place.formatted_address ?? 'Unknown Address')
      setPlaceOpeningHours(place.current_opening_hours?.weekday_text ?? [])
      setPlaceRating(place.rating ?? null)
      setPlaceIsOpen(place.current_opening_hours?.open_now ?? null)
      setPlacePhoto(place.photos?.[0].getUrl() ?? null)
      setPlaceReviews(place.reviews ?? [])
      setPlaceSanitaryInfo([])
      setPlaceSportsInfo([])
    }
  })
}

export default getDataFromPlaces
