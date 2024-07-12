import React, { useState, useCallback } from 'react'
import {
  APIProvider, Map, AdvancedMarker, Pin, InfoWindow
} from '@vis.gl/react-google-maps'
import UserLocation from './UserLocation'
import FilterButton from './FilterButton'

const GoogleMap = () => {
  const [zoom, setZoom] = useState(17)
  const [open, setOpen] = useState(null)
  const [position, setPosition] = useState({ lat: 52.520008, lng: 13.404954 })
  const [filteredPlaces, setFilteredPlaces] = useState([])

  const updatePosition = useCallback(coords => {
    if (coords) {
      setPosition({
        lat: coords.latitude,
        lng: coords.longitude
      })
    }
  }, [])

  const handleFilter = useCallback(places => {
    setFilteredPlaces(places)
  }, [])

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '700px', width: '100%' }}>
        <FilterButton onFilter={handleFilter} />
        {position ? (
          <Map
            zoom={zoom}
            center={position}
            onCenterChanged={e => setPosition(e.detail.center)}
            onZoomChanged={setZoom}
            mapId={process.env.REACT_APP_MAP_ID}
            onLoad={map => {
              // eslint-disable-next-line no-console
              console.log('Map Loaded:', map)
            }}
          >
            <AdvancedMarker position={position} onClick={() => setOpen(true)}>
              <Pin background="white" borderColor="purple" glyphColor="purple" />
            </AdvancedMarker>

            {open && (
              <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                <p>Your current location</p>
              </InfoWindow>
            )}

            {filteredPlaces.map(place => (
              <AdvancedMarker
                key={place.id}
                position={{ lat: place.latitude, lng: place.longitude }}
                onClick={() => setOpen(place.id)}
              >
                <Pin background="white" borderColor="purple" glyphColor="purple" />
                {open === place.id && (
                  <InfoWindow
                    position={{ lat: place.latitude, lng: place.longitude }}
                    onCloseClick={() => setOpen(null)}
                  >
                    <div>
                      <h2>{place.name}</h2>
                      <p>{place.description}</p>
                    </div>
                  </InfoWindow>
                )}
              </AdvancedMarker>
            ))}
            <UserLocation onGeolocationSuccess={updatePosition} />
          </Map>
        ) : (
          <div>Loading map...</div>
        )}
      </div>
    </APIProvider>
  )
}

export default GoogleMap
