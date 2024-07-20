import React, { useState, useCallback, useEffect } from 'react'
import {
  APIProvider, Map, AdvancedMarker, Pin, InfoWindow
} from '@vis.gl/react-google-maps'
import PropTypes from 'prop-types'
import UserLocation from './UserLocation'

const GoogleMap = ({ position }) => {
  const [zoom, setZoom] = useState(17)
  const [open, setOpen] = useState(false)
  const [mapPosition, setMapPosition] = useState({ lat: 52.520008, lng: 13.404954 })

  useEffect(() => {
    if (position) {
      setMapPosition(position)
    }
  }, [position])

  const updatePosition = useCallback(coords => {
    if (coords) {
      setMapPosition({
        lat: coords.latitude,
        lng: coords.longitude
      })
    }
  }, [])

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '700px', width: '100%' }}>
        {mapPosition ? (
          <Map
            zoom={zoom}
            center={mapPosition}
            onCenterChanged={e => setMapPosition(e.detail.center)}
            onZoomChanged={setZoom}
            mapId={process.env.REACT_APP_MAP_ID}
            onLoad={map => {
              // eslint-disable-next-line no-console
              console.log('Map Loaded:', map)
            }}
          >
            <AdvancedMarker position={mapPosition} onClick={() => setOpen(true)}>
              <Pin background="white" borderColor="purple" glyphColor="purple" />
            </AdvancedMarker>

            {open && (
              <InfoWindow position={mapPosition} onCloseClick={() => setOpen(false)}>
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

GoogleMap.propTypes = {
  // eslint-disable-next-line react/require-default-props
  position: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  })
}

export default GoogleMap
