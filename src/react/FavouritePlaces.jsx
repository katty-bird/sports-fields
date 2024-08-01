import React, { useState } from 'react'
import {
  Container, Box, Button, Popover, List, ListItem, ListItemText
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import PropTypes from 'prop-types'
import GoogleMap from './GoogleMap' // Import the GoogleMap component

// Sample reviews
const reviews = [
  {
    id: 1,
    field: 'Tempelhofer Feld',
    review: 'Spacious area with great facilities.',
    location: { lat: 52.475333, lng: 13.406741 }
  },
  {
    id: 2,
    field: 'Volkspark Friedrichshain',
    review: 'Well-maintained and beautiful park.',
    location: { lat: 52.526355, lng: 13.433835 }
  },
  {
    id: 3,
    field: 'Mauerpark',
    review: 'Great place for sports and leisure.',
    location: { lat: 52.543333, lng: 13.403061 }
  }
]

// eslint-disable-next-line react/prop-types
const FavouritePlaces = ({ selectedReview, setSelectedReview }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleReviewClick = review => {
    setSelectedReview(review) // Notify parent component
  }

  const handlePlaceClick = event => {
    setAnchorEl(anchorEl === event.currentTarget ? null : event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Container>
      <Box sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4
      }}
      >
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<StarIcon />}
            onClick={handlePlaceClick}
            sx={{ borderRadius: '8px', boxShadow: 3 }}
          >
            Favourite places
          </Button>
        </Box>

        <Popover
          id={id}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          PaperProps={{
            sx: {
              width: 300,
              maxHeight: 300,
              overflowY: 'auto'
            }
          }}
        >
          <List>
            {reviews.map(review => (
              <ListItem button onClick={() => handleReviewClick(review)} key={review.id}>
                <ListItemText
                  primary={review.field}
                  secondary={review.review}
                />
              </ListItem>
            ))}
          </List>
        </Popover>
      </Box>

      {/* Render GoogleMap with selectedReview */}
      <Box sx={{ height: '700px', width: '100%' }}>
        <GoogleMap selectedReview={selectedReview} />
      </Box>
    </Container>
  )
}

FavouritePlaces.propTypes = {
  // eslint-disable-next-line react/require-default-props
  selectedReview: PropTypes.shape({
    id: PropTypes.number,
    field: PropTypes.string,
    review: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  }),
  setSelectedReview: PropTypes.func.isRequired
}

export default FavouritePlaces
