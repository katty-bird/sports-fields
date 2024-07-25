import React, { useState, useCallback } from 'react'
import {
  APIProvider, Map, AdvancedMarker, Pin, InfoWindow
} from '@vis.gl/react-google-maps'
import UserLocation from './UserLocation'
import AlertDialog from './AlertDialog'

const GoogleMap = () => {
  const [zoom, setZoom] = useState(17)
  const [open, setOpen] = useState(false)
  const [mapCenter, setMapCenter] = useState({ lat: 52.520008, lng: 13.404954 })
  const [userPosition, setUserPosition] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(true)
  const [useLocation, setUseLocation] = useState(false)

  const updatePosition = useCallback(coords => {
    if (coords) {
      const newPosition = {
        lat: coords.latitude,
        lng: coords.longitude
      }
      setUserPosition(newPosition)
      setMapCenter(newPosition)
    }
  }, [])

  const handleAgree = () => {
    setDialogOpen(false)
    setUseLocation(true)
  }

  const handleDisagree = () => {
    setDialogOpen(false)
    setMapCenter({ lat: 52.520008, lng: 13.404954 }) // Center of Berlin
  }

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '700px', width: '100%' }}>
        {mapCenter ? (
          <Map
            zoom={zoom}
            center={mapCenter}
            onCenterChanged={e => setMapCenter(e.detail.center)}
            onZoomChanged={setZoom}
            mapId={process.env.REACT_APP_MAP_ID}
            onLoad={map => {
              // eslint-disable-next-line no-console
              console.log('Map Loaded:', map)
            }}
          >
            {userPosition && (
              <AdvancedMarker position={userPosition} onClick={() => setOpen(true)}>
                <Pin background="blue" borderColor="blue" glyphColor="white" />
              </AdvancedMarker>
            )}

            {open && (
              <InfoWindow position={userPosition} onCloseClick={() => setOpen(false)}>
                <p>Your current location</p>
              </InfoWindow>
            )}
            {useLocation && <UserLocation onGeolocationSuccess={updatePosition} />}
          </Map>
        ) : (
          <div>Loading map...</div>
        )}
        <AlertDialog open={dialogOpen} handleAgree={handleAgree} handleDisagree={handleDisagree} />
      </div>
    </APIProvider>
  )
}

export default GoogleMap
