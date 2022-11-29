import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} >
      <AlertTitle>{props.type}</AlertTitle>
      {props.children}
  </MuiAlert>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


const AlertMessage = ({open, handleClose, type, message}) => {
    
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
          <Snackbar 
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }} 
            open={open} 
            autoHideDuration={5000} 
            onClose={handleClose}>
              <Alert onClose={handleClose} severity={type} type={type}>
                  {message}
              </Alert>
          </Snackbar>
        </div>
    );
}

export default AlertMessage;