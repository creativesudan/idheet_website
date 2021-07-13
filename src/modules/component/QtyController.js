import React, {useState} from 'react';
import {Typography,Button,Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';




const useStyles = makeStyles((theme) => ({
    fabBtn:{
      width:36, height:36,
      boxShadow:'none', 
      background:'#fff', border:'1px solid #ccc', color:'#000',
      '&:hover':{
        color:'#fff'
      },
      '& svg':{
        fontSize:16
      }
    },
    qtyController:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      background:'#f7f7f8', borderRadius:36,
      '& $qty':{
        margin:theme.spacing(0, 1)
      },
    },
    qty:{
      fontSize:14,
      fontWeight:600
    }
  }));


export default function QtyController (props) {
    const classes = useStyles();
    const [qty, setQty]= useState(0)
    return (
        <div className={classes.qtyController}>
            {qty > 0 && 
              <>
              <Fab 
                size="small" 
                color="primary" 
                aria-label="remove" 
                classes={{sizeSmall:classes.fabBtn}}
                onClick={() => setQty(qty - 1)}
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
                classes={{sizeSmall:classes.fabBtn}}
                onClick={() => setQty(qty + 1)}
            >
                <AddIcon />
            </Fab>
        </div>
    )
}