/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import * as React from 'react'
import {
  Card,
  CardHeader,
  Grid,
  CardContent,
  Avatar,
  Typography,
  Rating
} from '@mui/material'

const CommentCard = ({ fieldReviews }) => {
  if (!Array.isArray(fieldReviews)) {
    return (
      <Typography variant="body2">No reviews available.</Typography>
    )
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={3}
    >
      {fieldReviews.map((review, index) => (
        <Grid item key={index}>
          <Card variant="outlined">
            <CardHeader
              avatar={(
                <Avatar>
                  {review?.author_name?.charAt(0).toUpperCase()}
                </Avatar>
              )}
              title={review?.author_name || 'Anonymous User'}
              action={<Rating value={review?.rating || 0} readOnly />}
            />
            <CardContent>
              <Typography variant="body2">{review?.text || ''}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default CommentCard
