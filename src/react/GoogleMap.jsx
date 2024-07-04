/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  APIProvider, Map, AdvancedMarker, Pin, InfoWindow
} from '@vis.gl/react-google-maps'
import { Button, Chip } from '@mui/material'
import PlaceDetails from '../hooks/placeDetails'
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

  // const [sportfield, setSportfield] = useState(null)

  // useEffect(() => {
  //   const getSportFieldData = async () => {
  //     const db = getFirestore(getApp())
  //     const sportfieldCollectionRef = collectionGroup(db, 'sport-fields')
  //     const q = query(
  //       sportfieldCollectionRef,
  //       where('pluscode', '==', 'FG6P+9W Berlin'),
  //       // where('name', '==', 'Sample Football Field'),
  //       limit(1)
  //     )
  //     const querySnapshot = await getDocs(q)
  //     const selectedSportField = querySnapshot.docs[0].data()
  //     setSportfield(selectedSportField)
  //   }
  //   getSportFieldData()
  // }, [])

  return (
    <div>
      {infopage && (
        // <Button onClick={closeInfoPage}>Info page placeholder</Button>
        <InfoPage
          sportfield={[
            placeName,
            placeAddress,
            placeRating,
            placeIsOpen,
            placeOpeningHours,
            placePhoto
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
                    placeIdInput="ChIJWc9EQTZJqEcRTOEDNragDJM"
                    setPlaceName={setPlaceName}
                    setPlaceAddress={setPlaceAddress}
                    setPlaceOpeningHours={setPlaceOpeningHours}
                    setPlaceRating={setPlaceRating}
                    setPlaceIsOpen={setPlaceIsOpen}
                    setPlacePhoto={setPlacePhoto}
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
