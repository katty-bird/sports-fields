import * as React from 'react'
import {
  Typography, Stack, Chip, Grid
} from '@mui/material'
import HoursTable from './HoursTable'
import InfoChip from './InfoChip'

const OverviewTab = () => (
  <Grid
    container
    direction="column"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={3}
  >
    <InfoChip title="Sport" />
    <InfoChip title="Hygiene" />
    <Grid item>
      <Typography variant="h6">
        Opening Hours
      </Typography>
      <HoursTable />
    </Grid>
  </Grid>
)

export default OverviewTab
