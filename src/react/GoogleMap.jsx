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
import AlertDialog from './AlertDialog'
import eventEmitter from './Profile/eventEmitter'

const GoogleMap = () => {
  const [zoom, setZoom] = useState(17)
  const [open, setOpen] = useState(false)

  const [currentOpen, setCurrentOpen] = useState(false)

  const [infopage, setInfopage] = useState(false)

  const [places, setPlaces] = useState([])
  const [position, setPosition] = useState({ lat: 52.45736432616367, lng: 13.519293310710195 })

  const [placeId, setPlaceId] = useState()
  const [placeName, setPlaceName] = useState()
  const [placeAddress, setPlaceAddress] = useState()
  const [placeOpeningHours, setPlaceOpeningHours] = useState([])
  const [placeRating, setPlaceRating] = useState()
  const [placeIsOpen, setPlaceIsOpen] = useState()
  const [placePhoto, setPlacePhoto] = useState()
  const [placeReviews, setPlaceReviews] = useState([])

  const [mapCenter, setMapCenter] = useState({ lat: 52.520008, lng: 13.404954 })
  const [userPosition, setUserPosition] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(true)
  const [useLocation, setUseLocation] = useState(false)

  const [selectedReview, setSelectedReview] = useState(null)

  const handlePinClick = (placeIdInput, lat, lng) => {
    setOpen(true)
    setPlaceId(placeIdInput)
    setPosition({ lat, lng })
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

  useEffect(() => {
    const handleSelectedReview = review => {
      if (review) {
        setMapCenter(review.location)
      }
    }

    eventEmitter.on('selectedReview', handleSelectedReview)

    return () => {
      // Clean up listener
      eventEmitter.off('selectedReview', handleSelectedReview)
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
        {mapCenter ? (
          <Map
            defaultZoom={15}
            zoom={zoom}
            defaultCenter={{ lat: 52.5200, lng: 13.4050 }}
            center={mapCenter}
            onCenterChanged={e => setMapCenter(e.detail.center)}
            onZoomChanged={e => setZoom()}
            mapId={process.env.REACT_APP_MAP_ID}
            onLoad={map => {
              // eslint-disable-next-line no-console
              console.log('Map Loaded:', map)
            }}
          >
            {/* Pin for current location */}
            {userPosition && (
              <AdvancedMarker position={userPosition} onClick={() => setCurrentOpen(true)}>
                <Pin background="blue" borderColor="blue" glyphColor="white" />
              </AdvancedMarker>
            )}
            {currentOpen && (
              <InfoWindow position={userPosition} onCloseClick={() => setCurrentOpen(false)}>
                <p>Your current location</p>
              </InfoWindow>
            )}
            {useLocation && <UserLocation onGeolocationSuccess={updatePosition} />}

            {/* Pins for nearby sport fields */}
            <PlacesList centerInput={mapCenter} setPlaces={setPlaces} />
            {
              places.map(place => (
                <AdvancedMarker
                  key={place.id}
                  position={{
                    lat: place.location.lat,
                    lng: place.location.lng
                  }}
                  onClick={() => handlePinClick(place.id, place.location.lat, place.location.lng)}
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
        <AlertDialog open={dialogOpen} handleAgree={handleAgree} handleDisagree={handleDisagree} />
      </div>
      )}
    </APIProvider>
  )
}

export default GoogleMap
