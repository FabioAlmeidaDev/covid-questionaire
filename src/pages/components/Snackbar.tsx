import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Notification = (props: any) => {
  const { open, setOpen, onClose, severity } = props;

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen({ ...open, open: false });
    if (open.onClose) {
      open.onClose();
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={open.open}
        autoHideDuration={6000}
        onClose={handleClose}
        // message={open.message}
        // action={
        //   <React.Fragment>
        //     <Button color="secondary" size="small" onClick={handleClose}>
        //       OK
        //     </Button>
        //     <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        //       {/* <CloseIcon fontSize="small" /> */}
        //     </IconButton>
        //   </React.Fragment>
        // }
      >
        <Alert onClose={handleClose} severity={open.severity}>
          {open.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
