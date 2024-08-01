/* eslint-disable react/prop-types */
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
  Skeleton,
  Chip,
  CardMedia
} from '@mui/material'
import InfoTabs from './InfoTabs'

const InfoPage = ({
  sportfield, onClose, placeID, setPlaceSportsInfo, setPlaceSanitaryInfo, setPlaceReviews
}) => {
  const fieldName = sportfield[0]
  const fieldAddress = sportfield[1]
  const fieldRating = sportfield[2]
  const fieldIsOpen = sportfield[3]
  const fieldOpeningHours = sportfield[4]
  const fieldPhoto = sportfield[5]
  const fieldReviews = sportfield[6]
  const fieldSportsInfo = sportfield[7]
  const fieldSanitaryInfo = sportfield[8]
  const handleBackClick = () => {
    onClose()
  }
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Card sx={{ mx: 'auto', width: 500, p: 5 }}>
        <CardActions>
          <IconButton id="back-button" size="large" onClick={handleBackClick}>
            <ChevronLeftIcon />
          </IconButton>
        </CardActions>

        <CardHeader
          id="info-header"
          title={fieldName}
          subheader={fieldAddress}
          action={
            <Rating value={fieldRating} precision={0.1} readOnly />
          }
        />
        <CardActions>
          {
            fieldIsOpen === true
            && <Chip label="Now Open" color="success" />
          }
          {
            fieldIsOpen === false
            && <Chip label="Closed" color="error" />
          }
          <Button id="directions-button" variant="contained" startIcon={<DirectionsIcon />}>
            Get Directions
          </Button>
        </CardActions>
        {
          fieldPhoto
          && (
          <CardMedia
            component="img"
            height="300"
            image={fieldPhoto}
            alt="Photo of sport field"
          />
          )
        }
        {
          !fieldPhoto
          && (
            <Skeleton variant="rounded" width={500} height={200} />
          )
        }

        <CardContent>
          <InfoTabs
            id="info-tabs"
            fieldOpeningHours={fieldOpeningHours}
            fieldSportsInfo={fieldSportsInfo}
            fieldSanitaryInfo={fieldSanitaryInfo}
            fieldReviews={fieldReviews}
            placeIdInput={placeID}
            setPlaceSportsInfo={setPlaceSportsInfo}
            setPlaceSanitaryInfo={setPlaceSanitaryInfo}
            setPlaceReviews={setPlaceReviews}
          />
        </CardContent>
      </Card>
    </Grid>
  )
}

export default InfoPage
