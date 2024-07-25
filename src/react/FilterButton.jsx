import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { getApp } from 'firebase/app'
import {
  collection, query, where, getDocs, getFirestore
} from 'firebase/firestore'
import {
  Button, MenuItem, FormControl, InputLabel, Select, Container, TextField, List, ListItem
} from '@mui/material'
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

const FilterButton = ({ onFilter, onPlaceSelect }) => {
  const [filter, setFilter] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [predictionResults, setPredictionResults] = useState([])
  const map = useMap()
  const places = useMapsLibrary('places')

  const [sessionToken, setSessionToken] = useState(null)
  const [autocompleteService, setAutocompleteService] = useState(null)
  const [placesService, setPlacesService] = useState(null)

  useEffect(() => {
    if (!places || !map) return

    setAutocompleteService(new places.AutocompleteService())
    setPlacesService(new places.PlacesService(map))
    setSessionToken(new places.AutocompleteSessionToken())

    // eslint-disable-next-line consistent-return
    return () => {
      setAutocompleteService(null)
    }
  }, [map, places])

  const fetchPredictions = useCallback(
    async value => {
      if (!autocompleteService || !value) {
        setPredictionResults([])
        return
      }

      const request = { input: value, sessionToken }
      const response = await autocompleteService.getPlacePredictions(request)

      setPredictionResults(response.predictions)
    },
    [autocompleteService, sessionToken]
  )

  const onInputChange = useCallback(
    event => {
      const { value } = event.target
      setInputValue(value)
      fetchPredictions(value)
    },
    [fetchPredictions]
  )

  const handleSuggestionClick = useCallback(
    placeId => {
      if (!places) return

      const detailRequestOptions = {
        placeId,
        fields: ['geometry', 'name', 'formatted_address'],
        sessionToken
      }

      const detailsRequestCallback = placeDetails => {
        onPlaceSelect(placeDetails)
        setPredictionResults([])
        setInputValue(placeDetails?.formattedAddress ?? '')
        setSessionToken(new places.AutocompleteSessionToken())
      }

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback)
    },
    [onPlaceSelect, places, placesService, sessionToken]
  )

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const applyFilter = async () => {
    try {
      const db = getFirestore(getApp())
      const q = query(collection(db, 'sports-fields'), where('type', '==', filter))
      const querySnapshot = await getDocs(q)
      const filteredPlaces = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      onFilter(filteredPlaces, filter)
    } catch (error) {
      console.error('Error fetching filtered places: ', error)
    }
  }

  return (
    <Container>
      <FormControl fullWidth variant="outlined" margin="normal" size="small">
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
      <TextField
        value={inputValue}
        onChange={onInputChange}
        placeholder="Search for a place"
        fullWidth
        margin="normal"
        variant="outlined"
        size="small"
      />
      {predictionResults.length > 0 && (
      <List>
        {predictionResults.map(({ place_id: placeId, description }) => (
          <ListItem
            button
            key={placeId}
            onClick={() => handleSuggestionClick(placeId)}
            style={{ fontSize: '0.875rem' }}
          >
            {description}
          </ListItem>
        ))}
      </List>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={applyFilter}
        disabled={!filter}
        fullWidth
        size="small"
        sx={{ mt: 2 }}
      >
        Filter anwenden
      </Button>
    </Container>
  )
}

FilterButton.propTypes = {
  onFilter: PropTypes.func.isRequired,
  onPlaceSelect: PropTypes.func.isRequired
}

export default FilterButton
