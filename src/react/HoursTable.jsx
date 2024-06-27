import * as React from 'react'
import {
  Table, TableBody, TableCell, TableRow
} from '@mui/material'

const HoursTable = () => (
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
)

export default HoursTable
