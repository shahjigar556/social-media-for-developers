import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Image() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" style={{marginLeft:'40px'}}onClick={handleClickOpen}>
        Upload Image
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Upload Image on Gravatar"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Make Your account on gravatar and Upload image There
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <a href="http://en.gravatar.com/" target="_blank" style={{textDecoration:'none'}}>
            <Button onClick={handleClose} color="primary">
                Visit
            </Button>
        </a>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}