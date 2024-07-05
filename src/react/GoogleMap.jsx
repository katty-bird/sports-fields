import React, { useState, useCallback } from 'react'
import {
  APIProvider, Map, AdvancedMarker, Pin, InfoWindow
} from '@vis.gl/react-google-maps'
import UserLocation from './UserLocation'

const GoogleMap = () => {
  const [zoom, setZoom] = useState(17)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ lat: 52.520008, lng: 13.404954 })
  // const [position, setPosition] = useState(null)
  // eslint-disable-next-line no-console
  console.log('position', position)
  // eslint-disable-next-line no-console
  console.log(process.env.REACT_APP_MAP_ID)

  const updatePosition = useCallback(coords => {
    if (coords) {
      setPosition({
        lat: coords.latitude,
        lng: coords.longitude
      })
    }
  }, [])

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
