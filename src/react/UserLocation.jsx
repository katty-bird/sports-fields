import React from 'react'
import PropTypes from 'prop-types'
import { useGeolocated } from 'react-geolocated'

const UserLocation = ({ onGeolocationSuccess }) => {
  const { isGeolocationAvailable, isGeolocationEnabled, coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true
    },
    userDecisionTimeout: 5000
  })

  React.useEffect(() => {
    if (coords) {
      onGeolocationSuccess(coords)
    }
  }, [coords, onGeolocationSuccess])

  if (!isGeolocationAvailable) {
    return <div>Your browser does not support Geolocation</div>
  }

  if (!isGeolocationEnabled) {
    return <div>Geolocation is not enabled</div>
  }

  if (coords) {
    return (
      <div>
        <h2>Current Location</h2>
        <p>
          Latitude:
          {coords.latitude}
        </p>
        <p>
          Longitude:
          {coords.longitude}
        </p>
      </div>
    )
  }

  return <div>Getting the location data...</div>
}

UserLocation.propTypes = {
  onGeolocationSuccess: PropTypes.func.isRequired
}

export default UserLocation
