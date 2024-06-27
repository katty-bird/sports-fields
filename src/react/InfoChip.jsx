/* eslint-disable react/prop-types */
import * as React from 'react'
import {
  Typography, Stack, Chip, Grid
} from '@mui/material'

const InfoChip = ({ title }) => (
  <Grid item>
    <Typography variant="h6">
      {title}
    </Typography>
    <Stack direction="row" spacing={1}>
      <Chip label="Basketball" />
      <Chip label="Football" />
    </Stack>
  </Grid>
)

export default InfoChip
