const usePlace = (id) => {
  var request = {
    placeId: id,
    fields: ['name', 'formattedAddress', 'plusCode', 'regularOpeningHours', 'rating']
  }
  
  service = new google.maps.places.PlacesService(map);
  service.getDetails(request, callback);
  
  function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(place)
    }
  }
  const placeInFirestore = firestoreLookup(id)
  const placeInGoogle = googleLookup(id)
  if placeInFirestore return placeInFirestore
  saveGoogleInFirestore(placeInGoogle)
     return realPlace
}
const place = usePlace(id)
// info page use place