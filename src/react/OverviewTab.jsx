/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  Typography, Grid, IconButton, TextField
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import HoursTable from './HoursTable'
import InfoChip from './InfoChip'
import updateFieldFirestore from '../hooks/updateFieldFirestore'

const OverviewTab = ({
  fieldOpeningHours,
  fieldSportsInfo,
  fieldSanitaryInfo,
  placeIdInput,
  setPlaceSportsInfo,
  setPlaceSanitaryInfo
}) => {
  const [sportsFieldValue, setSportsFieldValue] = useState('')
  const [sanitaryFieldValue, setSanitaryFieldValue] = useState('')

  const handleSportsInputChange = event => {
    setSportsFieldValue(event.target.value)
  }

  const handleSanitaryInputChange = event => {
    setSanitaryFieldValue(event.target.value)
  }

  const handleSportsButtonClick = () => {
    updateFieldFirestore({
      placeID: placeIdInput,
      fieldName: 'sports',
      fieldValue: sportsFieldValue
    }).then(() => {
      setPlaceSportsInfo([
        ...fieldSportsInfo,
        sportsFieldValue
      ])
      setSportsFieldValue('')
      setSanitaryFieldValue('')
    })
  }

  const handleSanitaryButtonClick = () => {
    updateFieldFirestore({
      placeID: placeIdInput,
      fieldName: 'sanitary',
      fieldValue: sanitaryFieldValue
    }).then(() => {
      setPlaceSanitaryInfo([
        ...fieldSanitaryInfo,
        sanitaryFieldValue
      ])
      setSportsFieldValue('')
      setSanitaryFieldValue('')
    })
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={3}
    >
      <InfoChip title="Sport" info={fieldSportsInfo} />
      <br />
      <Grid
        container
        direction="row"
      >
        <Grid item>
          <IconButton id="add-sport-info" onClick={() => handleSportsButtonClick()}>
            <AddCircleIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField id="add-sport-info-field" variant="outlined" size="small" onChange={handleSportsInputChange} label="Add sports info" />
        </Grid>
      </Grid>
      <InfoChip title="Sanitary" info={fieldSanitaryInfo} />
      <br />
      <Grid
        container
        direction="row"
      >
        <Grid item>
          <IconButton id="add-sanitary-info" onClick={() => handleSanitaryButtonClick()}>
            <AddCircleIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField id="add-sanitary-info-field" variant="outlined" size="small" onChange={handleSanitaryInputChange} label="Add sanitary info" />
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h6">
          Opening Hours
        </Typography>
        <HoursTable fieldOpeningHours={fieldOpeningHours} />
      </Grid>
    </Grid>
  )
}

export default OverviewTab
