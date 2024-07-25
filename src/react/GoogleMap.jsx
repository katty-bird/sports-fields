import React, { useState, useCallback, useEffect } from 'react'
import {
  APIProvider, Map, AdvancedMarker, Pin, InfoWindow
} from '@vis.gl/react-google-maps'
import { getApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import UserLocation from './UserLocation'
import FilterButton from './FilterButton'

const GoogleMap = () => {
  const [zoom, setZoom] = useState(12)
  const [open, setOpen] = useState(null)
  const [position, setPosition] = useState({ lat: 52.520008, lng: 13.404954 })
  const [places, setPlaces] = useState([])
  const [filter, setFilter] = useState('')

  const updatePosition = useCallback(coords => {
    if (coords) {
      setPosition({
        lat: coords.latitude,
        lng: coords.longitude
      })
    }
  }, [])

  const fetchPlaces = useCallback(async () => {
    const db = getFirestore(getApp())
    const querySnapshot = await getDocs(collection(db, 'sport_places'))
    const updatedPlaces = querySnapshot.docs.map(doc => {
      const data = doc.data()
      const { latitude, longitude } = data.coordinates
      return {
        id: doc.id,
        name: data.name,
        latitude,
        longitude,
        type: data.type,
        address: data.address
      }
    })
    setPlaces(updatedPlaces)
  }, [])

  useEffect(() => {
    fetchPlaces()
  }, [fetchPlaces])

  const handleFilter = useCallback((filteredPlaces, selectedFilter) => {
    setFilter(selectedFilter)
  }, [])

  const handlePlaceSelect = useCallback(place => {
    if (place?.geometry?.location) {
      setPosition({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      })
    }
  }, [])

  const getPinColors = type => {
    if (filter && type === filter) {
      switch (type) {
        case 'Fußball':
          return { background: 'red', borderColor: 'red', glyphColor: 'white' }
        case 'Basketball':
          return { background: 'orange', borderColor: 'orange', glyphColor: 'white' }
        case 'Tennis':
          return { background: 'purple', borderColor: 'purple', glyphColor: 'white' }
        default:
          return { background: 'grey', borderColor: 'grey', glyphColor: 'grey' }
      }
    }
    return { background: 'grey', borderColor: 'grey', glyphColor: 'grey' }
  }

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ position: 'relative', height: '700px', width: '100%' }}>
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
        }}
        >
          <FilterButton
            onFilter={handleFilter}
            onPlaceSelect={handlePlaceSelect}
          />
        </div>
        {position ? (
          <Map
            zoom={zoom}
            center={position}
            onCenterChanged={e => setPosition(e.detail.center)}
            onZoomChanged={setZoom}
            mapId={process.env.REACT_APP_MAP_ID}
            onLoad={map => {
              console.log('Map Loaded:', map)
            }}
          >
            {places.map(place => {
              const pinColors = getPinColors(place.type)
              return (
                <AdvancedMarker
                  key={place.id}
                  position={{
                    lat: place.latitude,
                    lng: place.longitude
                  }}
                  onClick={() => setOpen(place.id)}
                >
                  <Pin
                    background={pinColors.background}
                    borderColor={pinColors.borderColor}
                    glyphColor={pinColors.glyphColor}
                  />
                  {open === place.id && (
                  <InfoWindow
                    position={{ lat: place.latitude, lng: place.longitude }}
                    onCloseClick={() => setOpen(null)}
                  >
                    <div>
                      <h2>{place.name}</h2>
                      <p>{place.address}</p>
                    </div>
                  </InfoWindow>
                  )}
                </AdvancedMarker>
              )
            })}
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
