import React, { useState } from 'react'
import {
  APIProvider, Map, AdvancedMarker, Pin, InfoWindow
} from '@vis.gl/react-google-maps'

const GoogleMap = () => {
  // const position = { lat: 52.520008, lng: 13.404954 };
  const [zoom, setZoom] = useState(13)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ lat: 52.520008, lng: 13.404954 })
  // eslint-disable-next-line no-console
  console.log('position', position)

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '700px', width: '100%' }}>
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
              <p>I am in Berlin</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  )
}

export default GoogleMap
