import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getApp } from 'firebase/app'
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore
} from 'firebase/firestore'

const FilterButton = ({ onFilter }) => {
  const [filter, setFilter] = useState('')

  FilterButton.propTypes = {
    onFilter: PropTypes.func.isRequired
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const applyFilter = async () => {
    try {
      const db = getFirestore(getApp())
      const q = query(collection(db, 'sports_places'), where('type', '==', filter))
      const querySnapshot = await getDocs(q)
      const filteredPlaces = querySnapshot.docs.map(doc => doc.data())
      onFilter(filteredPlaces)
    } catch (error) {
      console.error('Error fetching filtered places: ', error)
    }
  }

  return (
    <div>
      <select value={filter} onChange={handleFilterChange}>
        <option value="">Wählen Sie einen Sportplatztyp</option>
        <option value="Fußball">Fußball</option>
        <option value="Basketball">Basketball</option>
        <option value="Tennis">Tennis</option>
        {/* weitere Optionen */}
      </select>
      <button type="button" onClick={applyFilter}>Filter anwenden</button>
    </div>
  )
}

export default FilterButton
