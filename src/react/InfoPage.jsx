import * as React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import DirectionsIcon from '@mui/icons-material/Directions'
import {
  Rating,
  Card,
  CardHeader,
  IconButton,
  CardActionArea,
  Grid,
  Button,
  CardActions,
  CardContent
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
    <Card sx={{ minWidth: 600, p: 5 }}>
      <CardActions>
        <IconButton id="back-button" aria-label="back" size="large">
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
        <CardMedia
          id="info-media"
          component="img"
          height="200"
          image="../assets/placeholder.png"
          alt="placeholder"
        />
        <InfoTabs id="info-tabs" />
      </CardContent>
    </Card>
  </Grid>
)

export default InfoPage
