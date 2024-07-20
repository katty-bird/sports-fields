import React, { useState } from 'react'
import {
  Container, Grid, Card, CardContent, Typography, Box
} from '@mui/material'
import GoogleMap from './GoogleMap'

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
  const [selectedReview, setSelectedReview] = useState(null)

  const handleReviewClick = review => {
    setSelectedReview(review)
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {reviews.map(review => (
          <Grid item xs={12} sm={6} md={4} key={review.id}>
            <Card onClick={() => handleReviewClick(review)} style={{ cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {review.field}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.review}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <GoogleMap review={selectedReview} />
      </Box>
    </Container>
  )
}

export default MyReviewsPage
