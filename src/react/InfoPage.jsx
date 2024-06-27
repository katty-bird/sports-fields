import * as React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import DirectionsIcon from '@mui/icons-material/Directions'
import {
  Rating,
  Card,
  CardHeader,
  IconButton,
  Grid,
  Button,
  CardActions,
  CardContent,
  Skeleton
} from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import InfoTabs from './InfoTabs'

const InfoPage = () => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
  >
    <Card sx={{ mx: 'auto', width: 500, p: 5 }}>
      <CardActions>
        <IconButton id="back-button" size="large">
          <ChevronLeftIcon />
        </IconButton>
      </CardActions>

      <CardHeader
        id="info-header"
        title="Sample Football Field"
        subheader="Hauptstraße 17 12529 Berlin"
        action={
          <Rating value={4} readOnly />
        }
      />
      <CardActions>
        <Button id="directions-button" variant="contained" startIcon={<DirectionsIcon />}>
          Get Directions
        </Button>
      </CardActions>
      <CardContent>
        {/* <CardMedia
          id="info-media"
          component="img"
          height="200"
          image="placeholder.png"
          alt="placeholder"
        /> */}
        <Skeleton variant="rounded" width={500} height={200} />
        <InfoTabs id="info-tabs" />
      </CardContent>
    </Card>
  </Grid>
)

export default InfoPage
