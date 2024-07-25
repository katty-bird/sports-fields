import * as React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

const AlertDialog = ({ open, handleAgree, handleDisagree }) => (
  <Dialog
    open={open}
    onClose={() => {}}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    disableEscapeKeyDown
    disableBackdropClick
  >
    <DialogTitle id="alert-dialog-title">
      Use Google location service?
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Allow access your location to show you relevant information based on where you are.
        If you disagree, the map will show a default location.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDisagree} color="primary">
        DISAGREE
      </Button>
      <Button onClick={handleAgree} color="primary" autoFocus>
        AGREE
      </Button>
    </DialogActions>
  </Dialog>
)

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleAgree: PropTypes.func.isRequired,
  handleDisagree: PropTypes.func.isRequired
}

export default AlertDialog
