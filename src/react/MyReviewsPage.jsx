import React, { useState } from 'react'
import {
  Container, Grid, Box, Popover, List, ListItem, ListItemText, Button
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import PlaceIcon from '@mui/icons-material/Place'
import GoogleMap from './GoogleMap'
import useFirebaseAuth from '../hooks/useFirebaseAuth'

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

const MyReviewsPage = () => {
  const { loading, user } = useFirebaseAuth()
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedReview, setSelectedReview] = useState(null)

  const handleReviewClick = review => {
    const event = new CustomEvent('selectedReview', { detail: review })
    window.dispatchEvent(event)
    setSelectedReview(review)
  }

  const handlePlaceClick = event => {
    // Add functionality to handle favorite places
    setAnchorEl(anchorEl === event.currentTarget ? null : event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <routes to="/" />
  }

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
            onClick={handleReviewClick}
            sx={{ borderRadius: '8px', boxShadow: 3 }}
          >
            My Reviews
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PlaceIcon />}
            onClick={handlePlaceClick}
            sx={{ borderRadius: '8px', boxShadow: 3 }}
          >
            Favourite Places
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
          {selectedReview && (
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
          )}
          {/* Add content for Favourite Places here */}
        </Popover>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              height: '500px',
              width: '100%',
              borderRadius: 1,
              boxShadow: 3,
              overflow: 'hidden'
            }}
          >
            <GoogleMap selectedReview={selectedReview} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default MyReviewsPage
