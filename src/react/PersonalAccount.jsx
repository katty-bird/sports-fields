import React from 'react'
import {
  Card,
  CardHeader,
  IconButton,
  Grid,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Rating
} from '@mui/material'
import InfoTabs from './InfoTabs'

const PersonalAccount = ({user, onLogout}) => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
  >
    <Card sx={{ mx: 'auto', width: 500, p: 2 }}>
      <CardActions>
        <IconButton id="back-button" size="large" onClick={onLogout}>
          {/* Back */}
          Back
        </IconButton>
      </CardActions>

      <CardHeader
        id="personal-account-header"
        title={user.displayName || 'John Doe'}
        subheader={user.email || 'john.doe@example.com'}
        action={<Rating value={5} readOnly />}
      />

      <CardMedia
        component="img"
        height="200"
        image={user.photoURL || 'https://via.placeholder.com/500x200'}
        alt="Profile Photo"
      />

      <CardContent>
        <Typography variant="h6">Personal Information</Typography>
        <Typography variant="body2">
          <strong>Name:</strong>
          {' '}
          {user.displayName || 'John Doe'}
        </Typography>
        <Typography variant="body2">
          <strong>Email:</strong>
          {' '}
          {user.email || 'john.doe@example.com'}
        </Typography>
        <Typography variant="body2">
          <strong>Address:</strong>
          {' '}
          123 Sample Street, Sample City
        </Typography>
        <InfoTabs id="personal-info-tabs" />
      </CardContent>

      <CardActions>
        <Button id="logout-button" variant="contained" color="primary" onClick={onLogout}>
          Logout
        </Button>
      </CardActions>
    </Card>
  </Grid>
)

export default PersonalAccount
