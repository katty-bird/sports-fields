import React, { useState } from 'react'
import PropTypes from 'prop-types' // Import PropTypes
import {
  Box, Typography, Grid, List, ListItem, ListItemText
} from '@mui/material'
import GoogleMap from './GoogleMap'

// Define propTypes for the MyReviews component
const MyReviews = ({ reviews }) => {
  const [selectedReviewId, setSelectedReviewId] = useState(null)

  return (
    <Box sx={{
      flexGrow: 1, minHeight: '100vh', bgcolor: 'background.paper', p: 2
    }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            My Reviews
          </Typography>
          <List>
            {reviews.map(review => (
              <ListItem
                key={review.id}
                button
                onClick={() => setSelectedReviewId(review.id)}
                selected={selectedReviewId === review.id}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.12)'
                    }
                  }
                }}
              >
                <ListItemText primary={review.field} secondary={review.review} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={8}>
          <GoogleMap reviews={reviews} selectedReviewId={selectedReviewId} />
        </Grid>
      </Grid>
    </Box>
  )
}

// Define PropTypes for MyReviews
MyReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      field: PropTypes.string.isRequired,
      review: PropTypes.string.isRequired,
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  ).isRequired
}

export default MyReviews
