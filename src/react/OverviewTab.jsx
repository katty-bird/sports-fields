import * as React from 'react'
import {
  Typography, Stack, Chip, Grid,
  Table, TableBody, TableCell, TableRow
} from '@mui/material'

const OverviewTab = () => (
  <Grid
    container
    direction="column"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={3}
  >
    <Grid item>
      <Typography variant="h6">
        Sport
      </Typography>
      <Stack direction="row" spacing={1}>
        <Chip label="Basketball" />
        <Chip label="Football" />
      </Stack>
    </Grid>
    <Grid item>
      <Typography variant="h6">
        Hygiene
      </Typography>
      <Stack direction="row" spacing={1}>
        <Chip label="WC" />
        <Chip label="Water Fountain" />
      </Stack>
    </Grid>
    <Grid item>
      <Typography variant="h6">
        Opening Hours
      </Typography>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>Monday</TableCell>
            <TableCell>9:00 - 20:00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tuesday</TableCell>
            <TableCell>9:00 - 20:00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wednesday</TableCell>
            <TableCell>9:00 - 20:00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Thursday</TableCell>
            <TableCell>9:00 - 20:00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Friday</TableCell>
            <TableCell>9:00 - 20:00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Saturday</TableCell>
            <TableCell>9:00 - 20:00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sunday</TableCell>
            <TableCell>9:00 - 20:00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  </Grid>
)

export default OverviewTab
