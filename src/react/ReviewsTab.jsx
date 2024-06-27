import * as React from 'react'
import {
  Rating,
  Card,
  CardHeader,
  Grid,
  Button,
  CardActions,
  CardContent,
  TextField,
  Avatar,
  Skeleton
} from '@mui/material'

const ReviewsTab = () => (
  <Grid
    container
    direction="column"
    justifyContent="flex-start"
    alignItems="flex-start"
    spacing={3}
  >
    <Grid item>
      <Card id="review-input">
        <CardActions>
          <TextField
            required
            label="Enter your review here!"
          />
          <Rating value={null} />
          <Button variant="contained">Send review</Button>
        </CardActions>
      </Card>
    </Grid>
    <Grid item>
      <Card>
        <CardHeader
          title="Anonymous User"
          subheader="18.01.2024"
        >
          <Avatar>
            A
          </Avatar>
        </CardHeader>
        <CardContent>
          <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
        </CardContent>
      </Card>
    </Grid>
  </Grid>
)

export default ReviewsTab
