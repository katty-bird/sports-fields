import React, { useState, useEffect } from 'react'
import {
  APIProvider, Map, AdvancedMarker, Pin, InfoWindow
} from '@vis.gl/react-google-maps'
import { getApp } from 'firebase/app'
import {
  query, where, getDocs, limit, collectionGroup, getFirestore
} from 'firebase/firestore'
import { Button } from '@mui/material'
import InfoPage from './InfoPage'

const GoogleMap = () => {
  const [zoom, setZoom] = useState(17)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ lat: 52.520008, lng: 13.404954 })
  // eslint-disable-next-line no-console
  console.log('position', position)
  // eslint-disable-next-line no-console
  console.log(process.env.REACT_APP_MAP_ID)

  const [infopage, setInfopage] = useState(false)
  const closeInfoPage = () => {
    setInfopage(false)
  }

  const [sportfield, setSportfield] = useState(null)

  useEffect(() => {
    const getSportFieldData = async () => {
      const db = getFirestore(getApp())
      const sportfieldCollectionRef = collectionGroup(db, 'sport-fields')
      const q = query(
        sportfieldCollectionRef,
        where('pluscode', '==', 'FG6P+9W Berlin'),
        // where('name', '==', 'Sample Football Field'),
        limit(1)
      )
      const querySnapshot = await getDocs(q)
      const selectedSportField = querySnapshot.docs[0].data()
      setSportfield(selectedSportField)
    }

    getSportFieldData()
  }, [])

  return (
    <div>
      {infopage && (
        <InfoPage sportfield={sportfield} onClose={closeInfoPage} />
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
                  <Button onClick={() => setInfopage(true)}>More Information</Button>
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
