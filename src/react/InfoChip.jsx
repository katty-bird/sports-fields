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
      {info.map(item => (
        <Chip key={item} label={item} size="medium" />
      ))}
    </Stack>
  </Grid>
)

export default InfoChip
