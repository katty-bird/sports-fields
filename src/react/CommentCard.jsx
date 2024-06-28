import * as React from 'react'
import {
  Card,
  CardHeader,
  Grid,
  CardContent,
  Avatar,
  Skeleton,
  Rating
} from '@mui/material'

const CommentCard = () => (
  <Grid item>
    <Card variant="outlined">
      <CardHeader
        avatar={(
          <Avatar>A</Avatar>
        )}
        title="Anonymous User"
        action={
          <Rating value={4} readOnly />
        }
      />
      <CardContent>
        <Skeleton variant="text" height={10} />
        <Skeleton variant="text" height={10} />
        <Skeleton variant="text" height={10} />
      </CardContent>
    </Card>
  </Grid>
)

export default CommentCard
