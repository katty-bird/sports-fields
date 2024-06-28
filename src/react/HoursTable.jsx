import * as React from 'react'
import {
  Table, TableBody, TableCell, TableRow
} from '@mui/material'

// eslint-disable-next-line react/prop-types
const HoursTable = ({ fieldOpeningHours }) => {
  // Use the fieldOpeningHours array to create table rows
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  // eslint-disable-next-line react/prop-types
  const tableRows = fieldOpeningHours.map((openingHours, index) => {
    const dayOfWeek = weekdays[(index)] // Adjust for Sunday as index 0
    return (
      <TableRow>
        <TableCell>{dayOfWeek}</TableCell>
        <TableCell>{openingHours}</TableCell>
      </TableRow>
    )
  })

  return (
    <Table size="small">
      <TableBody>
        {tableRows}
      </TableBody>
    </Table>
  )
}

export default HoursTable
