import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  Avatar,
  Box,
  Stack,
  Paper,
  Chip
} from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import EmailIcon from '@mui/icons-material/Email'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import SportsIcon from '@mui/icons-material/Sports'
import { useNavigate } from 'react-router-dom'

const PersonalAccount = ({ user, onLogout }) => {
  const navigate = useNavigate()

  const handleLogoutClick = async () => {
    await onLogout()
    navigate('/')
  }

  const handleReviewsPageClick = () => {
    navigate('/my-reviews') // Adjust the path if needed
  }

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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#9d00ff',
                color: 'white',
                borderRadius: '5px',
                padding: '10px 20px',
                mr: 2, // margin right to space out the buttons
                '&:hover': {
                  backgroundColor: '#ff4b4b'
                }
              }}
              onClick={handleReviewsPageClick}
            >
              My Reviews
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#9d00ff',
                color: 'white',
                borderRadius: '5px',
                padding: '10px 20px',
                '&:hover': {
                  backgroundColor: '#ff4b4b'
                }
              }}
              onClick={handleLogoutClick}
              startIcon={<ExitToAppIcon />}
            >
              Logout
            </Button>
          </Box>
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
  }).isRequired,
  onLogout: PropTypes.func.isRequired
}

export default PersonalAccount
