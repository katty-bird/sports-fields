/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react'
import {
  APIProvider, Map, AdvancedMarker, Pin, InfoWindow
} from '@vis.gl/react-google-maps'
import { Button, Chip } from '@mui/material'
import PlaceDetails from './PlaceDetails'
import InfoPage from './InfoPage'
import PlacesList from './PlacesList'
import UserLocation from './UserLocation'

const GoogleMap = () => {
  const [zoom, setZoom] = useState(17)
  const [open, setOpen] = useState(false)
  const [currentOpen, setCurrentOpen] = useState(false)
  const [position, setPosition] = useState({ lat: 52.45736432616367, lng: 13.519293310710195 })

  const [infopage, setInfopage] = useState(false)

  const [places, setPlaces] = useState([])

  const [placeId, setPlaceId] = useState()
  const [placeName, setPlaceName] = useState()
  const [placeAddress, setPlaceAddress] = useState()
  const [placeOpeningHours, setPlaceOpeningHours] = useState([])
  const [placeRating, setPlaceRating] = useState()
  const [placeIsOpen, setPlaceIsOpen] = useState()
  const [placePhoto, setPlacePhoto] = useState()
  const [placeReviews, setPlaceReviews] = useState([])

  const handlePinClick = placeIdInput => {
    setOpen(true)
    setPlaceId(placeIdInput)
  }

  const handlePinClose = () => {
    setOpen(false)
    setPlaceId(null)
  }

  const closeInfoPage = () => {
    setInfopage(false)
    setOpen(false)
    setPlaceId(null)
  }

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
      {infopage === true && (
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
      {infopage === false && (
      <div style={{ height: '700px', width: '100%' }}>
        {position ? (
          <Map
            zoom={zoom}
            defaultZoom={15}
            defaultCenter={{ lat: 52.5200, lng: 13.4050 }}
            center={position}
            onCenterChanged={e => setPosition(e.detail.center)}
            onZoomChanged={e => setZoom()}
            mapId={process.env.REACT_APP_MAP_ID}
            onLoad={map => {
              // eslint-disable-next-line no-console
              console.log('Map Loaded:', map)
            }}
          >
            {/* Pin for current location */}
            <AdvancedMarker position={position} onClick={() => setCurrentOpen(true)}>
              <Pin background="white" borderColor="red" glyphColor="red" />
            </AdvancedMarker>
            {currentOpen && (
              <InfoWindow position={position} onCloseClick={() => setCurrentOpen(false)}>
                <p>Your current location</p>
              </InfoWindow>
            )}
            <UserLocation onGeolocationSuccess={updatePosition} />

            {/* Pins for nearby sport fields */}
            <PlacesList centerInput={position} setPlaces={setPlaces} />
            {
              places.map(place => (
                <AdvancedMarker
                  key={place.id}
                  position={{
                    lat: place.location.lat,
                    lng: place.location.lng
                  }}
                  onClick={() => handlePinClick(place.id)}
                >
                  <Pin background="white" borderColor="purple" glyphColor="purple" />
                </AdvancedMarker>
              ))
            }
            {open && (
              <InfoWindow
                position={position}
                onCloseClick={() => handlePinClose()}
              >
                <PlaceDetails
                    placeIdInput={placeId}
                    setPlaceName={setPlaceName}
                    setPlaceAddress={setPlaceAddress}
                    setPlaceOpeningHours={setPlaceOpeningHours}
                    setPlaceRating={setPlaceRating}
                    setPlaceIsOpen={setPlaceIsOpen}
                    setPlacePhoto={setPlacePhoto}
                    setPlaceReviews={setPlaceReviews}
                />
                {placeIsOpen === true && <Chip label="Now Open" color="success" />}
                {placeIsOpen === false && <Chip label="Closed" color="error" />}
                {placeIsOpen === null && <Chip label="Status Unknown" color="warning" />}
                <h2>{placeName}</h2>
                <p>{placeAddress}</p>
                <Button variant="contained" onClick={() => setInfopage(true)}>More Information</Button>
                <Button variant="contained">Get Directions</Button>
              </InfoWindow>
            )}
          </Map>
          ) : (
            <div>Loading map...</div>
          )}
      </div>
      )}
    </APIProvider>
  )
}

export default GoogleMap
