import * as React from 'react'
import {
  Table, TableBody, TableCell, TableRow
} from '@mui/material'

// eslint-disable-next-line react/prop-types
const HoursTable = ({ fieldOpeningHours }) => {
  // eslint-disable-next-line react/prop-types
  const tableRows = fieldOpeningHours.map((openingHours, index) => {
    const parts = openingHours.split(':')
    const dayOfWeek = parts[0]
    const hours = parts[1]?.trim() || ''
    return (
      // eslint-disable-next-line react/no-array-index-key
      <TableRow key={index}>
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
