import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { QtyController } from '../component/index'

import {Button, Typography} from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { useSelector } from 'react-redux';
import slugify from 'react-slugify';


import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  text:{
    width:'100%',
    marginRight:0
  },
  locationGroup:{
    width:'100%',
    '& fieldset':{
      width:'100%',
    }
  }


}));


export default function ProductVariant() {
  const classes = useStyles();
  const cmsList = useSelector(state => state.app.cmsList);
  const settings = useSelector(state => state.app.settings);
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = React.useState(true);

  
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [value, setValue] = React.useState('female');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Dialog onClose={handleClose}  aria-labelledby="responsive-dialog-title"
        fullScreen={fullScreen} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Typography variant={'h5'} color={'textPrimary'}>Fresh Caulifower 1pc (Approx. 400 to 600)</Typography>
        <Typography variant={'subtitle2'} color={'textSecondary'}>Fresh Caulifower 1pc (Approx. 400 to 600)</Typography>
        </DialogTitle>
        <DialogContent dividers>
          
        <Typography variant="h6"><b>Select Your Quantity</b></Typography>
          <Typography variant={'subtitle1'} color={'textSecondary'}>Please Select any one option</Typography>
          
          <div className={classes.locationGroup}>
            <FormControl component="fieldset">
              <RadioGroup aria-label="Delhi" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel className={classes.text} value="Noida" control={<Radio color="primary"/>} 
                  label={<div style={{display:'flex', width:340}}><span style={{flex:1}}> 1 Pc</span>₹ 436.5</div>} />
                  <FormControlLabel className={classes.text} value="delhi" control={<Radio color="primary" />} 
                    label={<div style={{display:'flex', width:340}}><span style={{flex:1}}> 1 Pc</span>₹ 436.5</div>} />
                <FormControlLabel className={classes.text} value="Noa" control={<Radio color="primary" />} 
                  label={<div style={{display:'flex', width:340}}><span style={{flex:1}}> 1 Pc</span>₹ 436.5</div>} />
                  
              </RadioGroup>
            </FormControl>
          </div>

        </DialogContent>
        <DialogActions>
          <div style={{flex:1}}>
            
          <Button autoFocus onClick={handleClose} color="default">
            Cancel
          </Button>
          </div>
          <QtyController qty={2}/>

          <Button autoFocus onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
