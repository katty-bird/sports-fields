import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import OverviewTab from './OverviewTab'
import ReviewsTab from './ReviewsTab'

const InfoTabs = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab label="Overview" />
          <Tab label="Reviews" />
        </Tabs>
      </Box>
      {
        value === 0
        && (
          <OverviewTab />
        )
      }
      {
        value === 1
        && (
          <ReviewsTab />
        )
      }
    </div>
  )
}

export default InfoTabs
