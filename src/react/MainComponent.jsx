import React, { useState } from 'react'
import FilterButton from './FilterButton'
import GoogleMap from './GoogleMap'

const MainComponent = () => {
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [lat, setLat] = useState(52.520008)
  const [long, setLong] = useState(13.404954)

  const handleFilter = places => {
    setFilteredPlaces(places)
  }

  const handleLatChange = e => {
    setLat(parseFloat(e.target.value))
  }

  const handleLongChange = e => {
    setLong(parseFloat(e.target.value))
  }

  return (
    <div>
      <FilterButton onFilter={handleFilter} />
      <div>
        <label htmlFor="latitude">
          Latitude:
          <input id="latitude" type="number" value={lat} onChange={handleLatChange} />
        </label>
        <label htmlFor="longitude">
          Longitude:
          <input id="longitude" type="number" value={long} onChange={handleLongChange} />
        </label>
      </div>
      <GoogleMap places={filteredPlaces} center={{ lat, lng: long }} />
    </div>
  )
}

export default MainComponent
