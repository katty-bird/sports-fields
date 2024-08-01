import React, { useState } from 'react'
import {
  Rating,
  Card,
  Grid,
  Button,
  CardActions,
  TextField
} from '@mui/material'
import { getAuth } from 'firebase/auth'
import CommentCard from './CommentCard'
import updateFieldFirestore from '../hooks/updateFieldFirestore'

// eslint-disable-next-line react/prop-types
const ReviewsTab = ({ fieldReviews, setPlaceReviews, placeIdInput }) => {
  const auth = getAuth()
  const user = auth.currentUser
  const [reviewFieldValue, setReviewFieldValue] = useState('')
  const [ratingFieldValue, setRatingFieldValue] = useState(0)

  const handleReviewInputChange = event => {
    setReviewFieldValue(event.target.value)
  }

  const handleRatingInputChange = event => {
    setRatingFieldValue(event.target.value)
  }

  const handleButtonClick = () => {
    const review = {
      author_name: user.email,
      text: reviewFieldValue,
      rating: ratingFieldValue
    }
    updateFieldFirestore({
      placeID: placeIdInput,
      fieldName: 'reviews',
      fieldValue: review
    }).then(() => {
      setPlaceReviews([
        ...fieldReviews,
        review
      ])
      setReviewFieldValue('')
      setRatingFieldValue('')
    })
  }
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={3}
      >
        {
          user && (
            <Grid item>
              <Card id="review-input" variant="outlined">
                <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
                  <TextField
                    required
                    multiline
                    fullWidth
                    label="Enter your review here!"
                    style={{ marginBottom: '10px' }}
                    onChange={handleReviewInputChange}
                  />
                  <Rating value={ratingFieldValue} size="large" precision={0.5} style={{ marginBottom: '10px' }} onChange={handleRatingInputChange} />
                  <Button variant="contained" style={{ marginBottom: '10px' }} onClick={() => handleButtonClick()}>Send review</Button>
                </CardActions>
              </Card>
            </Grid>
          )
        }
        <CommentCard fieldReviews={fieldReviews} />
      </Grid>
    </div>
  )
}

export default ReviewsTab
