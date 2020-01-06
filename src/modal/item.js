import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import NumberFormat from 'react-number-format';

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
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 2, 4),
  },
}));

export default function SimpleModal(props) {

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const url = "http://localhost:8100/images/"+props.item.image

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);
  };
  
  let button = (
    <Button
      variant="contained" 
      className='loginButton'
      disabled
      onClick={()=>props.addCart(props.item)}>
      Login necessário
    </Button>
  )

  if(props.loggedIn){
    button = (
      <Button
        variant="contained" 
        className='loginButton'
        onClick={()=>props.addCart(props.item)}>
        Adicionar ao carrinho
      </Button>
    )
  }

  return (
    <div className="loginButton">      
      <img src={url} onClick={handleOpen}></img>
      <p onClick={handleOpen}>{props.item.name}</p>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
        <Grid container spacing={4}>
          <Grid 
            lg={6} 
            md={6} 
            sm={6} 
            container 
            item
            direction="row"
            justify="center"
            alignItems="center"
          >
            <img src={url} onClick={handleOpen}></img>
          </Grid>
          <Grid 
            lg={6} 
            md={6} 
            sm={6} 
            item
          >
            <h2 className="itemName" onClick={handleOpen} >{props.item.name}</h2>
            <p className="itemStock"  onClick={handleOpen}>{props.item.stock} disponiveis</p>
            <h3 className="itemPrice">
              <NumberFormat onClick={handleOpen} value={props.item.price} displayType={'text'} decimalScale={2} fixedDecimalScale={true} prefix={'R$'} decimalSeparator={','}/>
            </h3>
            <TextField
              id="outlined-size-small"
              label="Quantidade"
              type="number"
              defaultValue="1"
              inputProps={{ min: "1", max: props.item.stock, step: "1" }}
              margin="normal"              
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              variant="outlined"
              onChange={props.handleChange('quantity')}
            />
            {button}
          </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}