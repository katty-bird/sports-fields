import * as React from 'react'
import {
  Card,
  CardHeader,
  Grid,
  CardContent,
  Avatar,
  Skeleton
} from '@mui/material'

const CommentCard = () => (
  <Grid item>
    <Card variant="outlined">
      <CardHeader
        title="Anonymous User"
        subheader="18.01.2024"
      >
        <Avatar src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" />
      </CardHeader>
      <CardContent>
        <Skeleton variant="text" height={10} />
        <Skeleton variant="text" height={10} />
        <Skeleton variant="text" height={10} />
      </CardContent>
    </Card>
  </Grid>
)

export default CommentCard