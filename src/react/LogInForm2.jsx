import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types'

const LogInForm2 = ({
  username, password, onUsernameChange, onPasswordChange, onLoginClicked
}) => (
  <div>
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={e => onUsernameChange(e.target.value)}
      style={{ margin: '5px' }}
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={e => onPasswordChange(e.target.value)}
      style={{ margin: '5px' }}
    />
    {/* eslint-disable-next-line react/button-has-type */}
    <button onClick={onLoginClicked} style={{ margin: '5px' }}>
      Login
    </button>
  </div>
)

LogInForm2.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onLoginClicked: PropTypes.func.isRequired
}

export default LogInForm2
