import React from 'react'
import {
  AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import SportsSoccer from '@mui/icons-material/SportsSoccer'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const TopBar = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const navigate = useNavigate()

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    handleClose()
    await onLogout()
    navigate('/')
  }

  const handleNavigation = path => {
    handleClose()
    navigate(path)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home" onClick={() => navigate('/')}>
            <SportsSoccer sx={{ mr: 2 }} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SportsFields App
          </Typography>
          {user && (
            <div>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleNavigation('/profile')}>Profile</MenuItem>
                <MenuItem onClick={() => handleNavigation('/my-reviews')}>Favourite Places</MenuItem>
                <MenuItem onClick={() => handleNavigation('/')}>Map</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

TopBar.propTypes = {
  // eslint-disable-next-line react/require-default-props,react/forbid-prop-types
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
}

export default TopBar
