import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getApp } from 'firebase/app'
import {
  collection, query, where, getDocs, getFirestore
} from 'firebase/firestore'
import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Container
} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'

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
      const filteredPlaces = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      onFilter(filteredPlaces)
    } catch (error) {
      console.error('Error fetching filtered places: ', error)
    }
  }

  return (
    <Container>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Sportplatztyp</InputLabel>
        <Select
          value={filter}
          onChange={handleFilterChange}
          label="Sportplatztyp"
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="Fußball">Fußball</MenuItem>
          <MenuItem value="Basketball">Basketball</MenuItem>
          <MenuItem value="Tennis">Tennis</MenuItem>
          {/* weitere Optionen */}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        startIcon={<FilterListIcon />}
        onClick={applyFilter}
        disabled={!filter}
        fullWidth
        sx={{ mt: 2 }}
      >
        Filter anwenden
      </Button>
    </Container>
  )
}

export default FilterButton
