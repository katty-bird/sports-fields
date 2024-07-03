import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import OverviewTab from './OverviewTab'
import ReviewsTab from './ReviewsTab'

// eslint-disable-next-line react/prop-types
const InfoTabs = ({ fieldOpeningHours, fieldSportInfo, fieldSanitaryInfo }) => {
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
          <OverviewTab
            fieldOpeningHours={fieldOpeningHours}
            fieldSportInfo={fieldSportInfo}
            fieldSanitaryInfo={fieldSanitaryInfo}
          />
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
