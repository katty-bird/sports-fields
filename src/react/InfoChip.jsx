/* eslint-disable react/prop-types */
import * as React from 'react'
import {
  Typography, Stack, Chip, Grid
} from '@mui/material'

const InfoChip = ({ title, info }) => (
  <Grid item>
    <Typography variant="h6">
      {title}
    </Typography>
    <Stack direction="row" spacing={1}>
      {/* <Chip label="Basketball" />
      <Chip label="Football" /> */}
      {info.map(item => (
        <Chip key={item} label={item} />
      ))}
    </Stack>
  </Grid>
)

export default InfoChip