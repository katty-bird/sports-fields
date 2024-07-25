import * as React from 'react'
import {
  Table, TableBody, TableCell, TableRow
} from '@mui/material'

// eslint-disable-next-line react/prop-types
const HoursTable = ({ fieldOpeningHours }) => {
  // eslint-disable-next-line react/prop-types
  if (!fieldOpeningHours.length) {
    return (
      <TableRow key={0}>
        <TableCell>No opening times available</TableCell>
      </TableRow>
    )
  }
  // eslint-disable-next-line react/prop-types
  const tableRows = fieldOpeningHours.map(openingHours => {
    const colonIndex = openingHours.indexOf(':')
    const dayOfWeek = openingHours.slice(0, colonIndex).trim()
    const hours = openingHours.slice(colonIndex + 1).trim()
    return (
      <TableRow key={dayOfWeek}>
        <TableCell>{dayOfWeek}</TableCell>
        <TableCell>{hours}</TableCell>
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
