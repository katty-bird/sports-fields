import * as React from 'react'
import {
  Typography, Grid
} from '@mui/material'
import HoursTable from './HoursTable'
import InfoChip from './InfoChip'

// eslint-disable-next-line react/prop-types
const OverviewTab = ({ fieldOpeningHours, fieldSportInfo, fieldSanitaryInfo }) => (
  <Grid
    container
    direction="column"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={3}
  >
    <InfoChip title="Sport" info={fieldSportInfo} />
    <InfoChip title="Sanitary" info={fieldSanitaryInfo} />
    <Grid item>
      <Typography variant="h6">
        Opening Hours
      </Typography>
      <HoursTable fieldOpeningHours={fieldOpeningHours} />
    </Grid>
  </Grid>
)

export default OverviewTab
