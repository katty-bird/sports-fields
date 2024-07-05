import React, { useState } from 'react'
import FilterButton from './FilterButton'
import GoogleMap from './GoogleMap'
import GeoForm from './GeoForm'

const MainComponent = () => {
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [lat, setLat] = useState(52.520008)
  const [long, setLong] = useState(13.404954)

  const handleFilter = places => {
    setFilteredPlaces(places)
  }

  return (
    <div>
      <FilterButton onFilter={handleFilter} />
      <GeoForm lat={lat} long={long} onLatChange={setLat} onLongChange={setLong} />
      <GoogleMap places={filteredPlaces} />
    </div>
  )
}

export default MainComponent
