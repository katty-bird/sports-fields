import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  Avatar,
  Box,
  Stack,
  Paper,
  Chip,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Button
} from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import EmailIcon from '@mui/icons-material/Email'
import SportsIcon from '@mui/icons-material/Sports'
import GoogleMap from './GoogleMap'

const reviews = [
  {
    id: 1,
    field: 'Tempelhofer Feld',
    review: 'Spacious area with great facilities.',
    location: { lat: 52.475333, lng: 13.406741 }
  },
  {
    id: 2,
    field: 'Volkspark Friedrichshain',
    review: 'Well-maintained and beautiful park.',
    location: { lat: 52.526355, lng: 13.433835 }
  },
  {
    id: 3,
    field: 'Mauerpark',
    review: 'Great place for sports and leisure.',
    location: { lat: 52.543333, lng: 13.403061 }
  }
]

const PersonalAccount = ({ user }) => {
  const [userPosition, setUserPosition] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedReview, setSelectedReview] = useState(null)

  useEffect(() => {
    // Update user position from GoogleMap component (if available)
    const handleUserPositionUpdate = position => {
      setUserPosition(position)
    }

    // Add listener for user position updates
    window.addEventListener('userPositionUpdated', handleUserPositionUpdate)

    return () => {
      // Remove listener on component unmount
      window.removeEventListener('userPositionUpdated', handleUserPositionUpdate)
    }
  }, [])

  const handleReviewClick = review => {
    setSelectedReview(review)
    setAnchorEl(null) // Close the popover
  }

  const handlePlaceClick = event => {
    setAnchorEl(anchorEl === event.currentTarget ? null : event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundImage: 'linear-gradient(to right, #00C78C, #009E60)',
            color: 'white'
          }}
        >
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Welcome back,
            {' '}
            {user.displayName || 'Sporty One'}
            !
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ py: 5 }}>
          <Grid item xs={12}>
            <Paper
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                borderRadius: '4px',
                boxShadow: 3
              }}
            >
              <Avatar
                alt="Profile Photo"
                src={user.photoURL || 'https://via.placeholder.com/150'}
                sx={{ width: 150, height: 150 }}
              />
              <Box sx={{ ml: 3 }}>
                <Typography variant="h4" gutterBottom>
                  {user.displayName || 'YourName'}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    icon={<SportsIcon />}
                    label={user.jobTitle || 'Sports Enthusiast'}
                    variant="outlined"
                  />
                  {user.company && <Chip label={user.company} variant="outlined" />}
                </Stack>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ p: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="body1" paragraph>
                  <strong>Email:</strong>
                  {' '}
                  {user.email}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>About Me:</strong>
                  {' '}
                  {user.aboutMe || 'A passionate athlete.'}
                </Typography>

                <Stack direction="row" spacing={2} mt={2}>
                  <IconButton href={user.linkedin || '#'} aria-label="LinkedIn">
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton href={user.twitter || '#'} aria-label="Twitter">
                    <TwitterIcon />
                  </IconButton>
                  <IconButton href={`mailto:${user.email}`} aria-label="Email">
                    <EmailIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {userPosition && (
            <Grid item xs={12}>
              <GoogleMap mapCenter={userPosition} />
            </Grid>
          )}

          <Grid item xs={12}>
            <Box mt={5}>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePlaceClick}
                sx={{ borderRadius: '8px', boxShadow: 3 }}
              >
                Favourite places
              </Button>
              <Popover
                id={id}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
                PaperProps={{
                  sx: {
                    width: 300,
                    maxHeight: 300,
                    overflowY: 'auto'
                  }
                }}
              >
                <List>
                  {reviews.map(review => (
                    <ListItem button onClick={() => handleReviewClick(review)} key={review.id}>
                      <ListItemText
                        primary={review.field}
                        secondary={review.review}
                      />
                    </ListItem>
                  ))}
                </List>
              </Popover>

              {selectedReview && (
                <Box mt={5} sx={{ height: '700px', width: '100%' }}>
                  <GoogleMap selectedReview={selectedReview} />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

PersonalAccount.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoURL: PropTypes.string,
    jobTitle: PropTypes.string,
    company: PropTypes.string,
    linkedin: PropTypes.string,
    twitter: PropTypes.string,
    aboutMe: PropTypes.string
  }).isRequired
}

export default PersonalAccount
