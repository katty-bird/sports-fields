import * as React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import {
  Rating,
  Card,
  CardHeader,
  IconButton,
  CardActionArea,
  Grid
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
    style={{ minHeight: '100vh' }}
  >
    <Card sx={{ maxWidth: 500 }} centered>
      <IconButton id="back-button" aria-label="back" size="large">
        <ChevronLeftIcon />
      </IconButton>
      <CardHeader
        title="Sample Football Field"
        subheader="Hauptstraße 17 12529 Berlin"
        action={
          <Rating value={4} readOnly />
        }
      />
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="./assets/react-logos/react-logo-1.png"
          alt="placeholder"
        />
      </CardActionArea>
      <InfoTabs />
    </Card>
  </Grid>
)

export default InfoPage
