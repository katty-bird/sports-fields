/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  APIProvider, Map, AdvancedMarker, Pin, InfoWindow
} from '@vis.gl/react-google-maps'
import { Button, Chip } from '@mui/material'
import PlaceDetails from './PlaceDetails'
import InfoPage from './InfoPage'

const GoogleMap = () => {
  const [zoom, setZoom] = useState(17)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ lat: 52.45736432616367, lng: 13.519293310710195 })

  const [infopage, setInfopage] = useState(false)
  const closeInfoPage = () => {
    setInfopage(false)
  }

  const [placeName, setPlaceName] = useState()
  const [placeAddress, setPlaceAddress] = useState()
  const [placeOpeningHours, setPlaceOpeningHours] = useState([])
  const [placeRating, setPlaceRating] = useState()
  const [placeIsOpen, setPlaceIsOpen] = useState()
  const [placePhoto, setPlacePhoto] = useState()
  const [placeReviews, setPlaceReviews] = useState([])

  return (
    <div>
      {infopage && (
        <InfoPage
          sportfield={[
            placeName,
            placeAddress,
            placeRating,
            placeIsOpen,
            placeOpeningHours,
            placePhoto,
            placeReviews
          ]}
          onClose={closeInfoPage}
        />
      )}
      {!infopage && (
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
                  <PlaceDetails
                    placeIdInput="ChIJfYeoWi9PqEcR0YMn_UDbXuw"
                    setPlaceName={setPlaceName}
                    setPlaceAddress={setPlaceAddress}
                    setPlaceOpeningHours={setPlaceOpeningHours}
                    setPlaceRating={setPlaceRating}
                    setPlaceIsOpen={setPlaceIsOpen}
                    setPlacePhoto={setPlacePhoto}
                    setPlaceReviews={setPlaceReviews}
                  />
                  {
                    placeIsOpen === true
                    && <Chip label="Now Open" color="success" />
                  }
                  {
                    placeIsOpen === false
                    && <Chip label="Closed" color="error" />
                  }
                  <h2>{placeName}</h2>
                  <p>{placeAddress}</p>
                  <Button variant="contained" onClick={() => setInfopage(true)}>More Information</Button>
                  <Button variant="contained">Get Directions</Button>
                </InfoWindow>
              )}
            </Map>
          </div>
        </APIProvider>
      )}
    </div>
  )
}

export default GoogleMap
