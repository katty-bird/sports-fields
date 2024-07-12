import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  APIProvider, Map, AdvancedMarker, Pin, InfoWindow
} from '@vis.gl/react-google-maps'
import UserLocation from './UserLocation'

const GoogleMap = ({ places, center }) => {
  const [zoom, setZoom] = useState(17)
  const [open, setOpen] = useState(null)
  const [position, setPosition] = useState(center)

  useEffect(() => {
    setPosition(center)
  }, [center])

  const updatePosition = coords => {
    if (coords) {
      setPosition({
        lat: coords.latitude,
        lng: coords.longitude
      })
    }
  }

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '700px', width: '100%' }}>
        {position ? (
          <Map
            zoom={zoom}
            center={position}
            onCenterChanged={e => setPosition(e.detail.center)}
            onZoomChanged={setZoom}
            mapId={process.env.REACT_APP_MAP_ID}
            onLoad={map => {
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

            {places.map(place => (
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

GoogleMap.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string
  })).isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired
}

export default GoogleMap
