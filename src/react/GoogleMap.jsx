import React, { useState, useEffect } from 'react'
import {
  APIProvider, Map, AdvancedMarker, Pin, InfoWindow
} from '@vis.gl/react-google-maps'
import PropTypes from 'prop-types'

const GoogleMap = ({ review }) => {
  const [zoom, setZoom] = useState(17)
  const [open, setOpen] = useState(false)
  const [mapPosition, setMapPosition] = useState({ lat: 52.520008, lng: 13.404954 })

  useEffect(() => {
    if (review && review.location) {
      setMapPosition(review.location)
      setOpen(true)
    }
  }, [review])

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
                <div>
                  <h2>{review.field}</h2>
                  <p>{review.review}</p>
                </div>
              </InfoWindow>
            )}
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
  review: PropTypes.shape({
    field: PropTypes.string,
    review: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  })
}

export default GoogleMap
