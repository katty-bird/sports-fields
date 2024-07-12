/* eslint-disable no-dupe-keys */
import { useState, useEffect } from 'react'
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps'

const PlacesList = ({ setPlaces }) => {
  const map = useMap()
  const placesLibrary = useMapsLibrary('places')
  const [placesService, setPlacesService] = useState()

  useEffect(() => {
    if (!placesLibrary || !map) return
    setPlacesService(new placesLibrary.PlacesService(map))
  }, [placesLibrary, map])

  const request = {
    // query: 'sport',
    type: 'stadium',
    // includedType: 'sports_complex',
    // includedType: 'athletic_field',
    locationBias: {
      circle: {
        center: {
          latitude: 52.45736432616367,
          longitude: 13.519293310710195
        },
        radius: 500.0
      }
    }
  }

  useEffect(() => {
    const run = async () => {
      if (!placesService) return
      await placesService.textSearch(request, (results, status) => {
        if (status === placesLibrary.PlacesServiceStatus.OK) {
          setPlaces(results)
          console.log(results[0].geometry.location.lat())
        }
      })
    }
    run()
  }, [placesService])
}

export default PlacesList
