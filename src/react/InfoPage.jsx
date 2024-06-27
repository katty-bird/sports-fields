import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

const InfoPage = ({ overviewSelected }) => (
  <Box
    id="header"
    sx={() => ({
      width: '100%'
    })}
  >
    <IconButton id="back-button" aria-label="back">
      <ChevronLeftIcon />
    </IconButton>
    {
            overviewSelected
            && <p>sfsf</p>
    }

  </Box>
)

export default InfoPage
