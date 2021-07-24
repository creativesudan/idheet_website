import React, { useEffect, useState } from 'react';
import { Typography, Button, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';




const useStyles = makeStyles((theme) => ({
  fabBtn: {
    width: 36, height: 36,
    boxShadow: 'none',
    background: '#fff', border: '1px solid #ccc', color: '#000',
    '&:hover': {
      color: '#fff'
    },
    '& svg': {
      fontSize: 16
    }
  },
  qtyController: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    background: '#f7f7f8', borderRadius: 36,
    '& $qty': {
      margin: theme.spacing(0, 1)
    },
  },
  qty: {
    fontSize: 14,
    fontWeight: 600
  }
}));


export default function QtyController(props) {
  const classes = useStyles();
  // const [qty, setQty] = useState(props.qty);
  const { qty } = props;
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const history = useHistory();
  let updatedCartItem = { ...props.cartItem };

  useEffect(() => {
    // setQty(props.qty);
  }, [props.qty]);

  const handleQtyInc = () => {
    // setQty(newQty);
    if (!isAuthenticated) {
      history.push("/login");
    }
    else {
      updatedCartItem.qty = 1;
      props.handleQtyInc(updatedCartItem);
    }
  }

  const handleQtyDec = () => {
    // setQty(newQty);
    props.handleQtyDec(updatedCartItem);
  }

  return (
    <div className={classes.qtyController}>
      {qty > 0 &&
        <>
          <Fab
            size="small"
            color="primary"
            aria-label="remove"
            classes={{ sizeSmall: classes.fabBtn }}
            onClick={() => handleQtyDec()}
            disabled={props.disabled}
          >
            <RemoveIcon />
          </Fab>
          <span className={classes.qty}>{qty}</span>
        </>
      }
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        classes={{ sizeSmall: classes.fabBtn }}
        onClick={() => handleQtyInc()}
        disabled={props.disabled}
      >
        <AddIcon />
      </Fab>
    </div>
  )
}