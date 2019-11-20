import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="loginButton">
      <Button type="button" onClick={handleOpen}>
        Login
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
        <TextField
          id="login"
          label="Login"
          className='textField'
          value={props.login}
          onChange={props.handleChange('login')}
          margin="normal"
        />
        <br/>
        <TextField
          id="password"
          label="Password"
          className='textField'
          type="password"
          value={props.password}
          onChange={props.handleChange('password')}
          margin="normal"
        />
        <br/>
        <Button 
          variant="contained" 
          className='loginButton'
          onClick={()=>props.loginFunction()}>
          Login
      </Button>
        </div>
      </Modal>
    </div>
  );
}