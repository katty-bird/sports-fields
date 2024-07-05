import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onLoginClicked
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}
  >
    <div style={{ marginBottom: '5px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '100px'
        }}
      >
        Username:
      </span>
      <input
        type="text"
        value={username}
        onChange={e => onUsernameChange(e.target.value)}
      />
    </div>
    <div>
      <span
        style={{
          display: 'inline-block',
          width: '100px'
        }}
      >
        Password:
      </span>
      <input
        type="password"
        value={password}
        onChange={e => onPasswordChange(e.target.value)}
      />
    </div>
    <button
      type="button"
      onClick={onLoginClicked}
    >
      Login
    </button>
  </div>
)

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onLoginClicked: PropTypes.func.isRequired
}

export default LoginForm
