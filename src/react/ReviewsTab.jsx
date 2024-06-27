import * as React from 'react'
import {
  Rating,
  Card,
  Grid,
  Button,
  CardActions,
  TextField
} from '@mui/material'
import CommentCard from './CommentCard'

const ReviewsTab = () => (
  <Grid
    container
    direction="column"
    justifyContent="flex-start"
    alignItems="stretch"
    spacing={3}
  >
    <Grid item>
      <Card id="review-input" variant="outlined">
        <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            required
            multiline
            fullWidth
            label="Enter your review here!"
            style={{ marginBottom: '10px' }}
          />
          <Rating value={null} size="large" precision={0.5} style={{ marginBottom: '10px' }} />
          <Button variant="contained" style={{ marginBottom: '10px' }}>Send review</Button>
        </CardActions>
      </Card>
    </Grid>
    <CommentCard />
    <CommentCard />
  </Grid>
)

export default ReviewsTab
