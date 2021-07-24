import React, { useEffect, useState } from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import { Container,Breadcrumbs,Link,Typography,Paper,Grid,Divider,Button} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import CloseIcon from '@material-ui/icons/Close';

import {CustomBadge} from '../component/index'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PhoneIcon from '@material-ui/icons/Phone';

import { useDispatch, useSelector } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Box from '@material-ui/core/Box';
import LeftPanel from '../myAccount/LeftPanel';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  sectionGap:{
    margin: theme.spacing(6, 0)
  },
  BreadcrumbsContainer:{
    padding:'20px 0',
    background:'#e9ecef'
  },
  tiles:{
    padding:'10px 20px'
  },
}))




export default function OrderDetail() {
  const classes = useStyles();
  const user = useSelector(state => state.auth.user);
  
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
        <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title"><b>{"Cancel Order Item"}</b></DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you Sure you want to cancel this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Yes
          </Button>
          <Button color="default" variant="outlined" onClick={handleClose} autoFocus>
            Not Now
          </Button>
        </DialogActions>
      </Dialog>


    <div className={classes.BreadcrumbsContainer}>
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="primary" href="/">
            Home
          </Link>
          <Link color="primary" href="/">
            My Orders
          </Link>
          <Typography color="textPrimary">Order Detail</Typography>
        </Breadcrumbs>
      </Container>
    </div>
    <Container>
      <div className={classes.sectionGap}>


      <Grid container spacing={3}>
            <Grid item lg={4}>
              <LeftPanel user={user} />
            </Grid>
            <Grid item lg={8}>
              
            <Paper>
              <div className={classes.tiles}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant='subtitle2' color="textSecondary">
                      16 June, 11:30AM
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button onClick={handleClickOpen} variant="contained" color="primary" size="large">Cancel Order</Button>
                  </Grid>
                </Grid>
              </div>
              <Divider/>

              <div className={classes.tiles}>
                <Typography variant='h5' color="textPrimary">
                  <b>Order Status</b>
                </Typography>
                <Box>
                  <Typography variant='subtitle2' color="textSecondary">
                    Preparing order
                  </Typography>
                </Box>
              </div>
              <Divider/>

              <div className={classes.tiles}>
                <Typography variant='h5' color="textPrimary">
                <b>Destination</b>
                </Typography>
                <Box>
                  <Typography variant='subtitle2' color="textSecondary">
                    Location. Address, XYZ
                  </Typography>
                </Box>
              </div>
              <Divider/>

              <div className={classes.tiles}>
                <Typography variant='h5' color="textPrimary">
                <b>Payment Type</b>
                </Typography>
                <Box>
                  <Typography variant='subtitle2' color="textSecondary">
                    COD
                  </Typography>
                </Box>
              </div>
              <Divider/>

              <div className={classes.tiles}>
                <Typography variant='h5' color="textPrimary">
                  <b>Items</b>
                </Typography>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Box>
                      <Typography variant='subtitle2' color="textSecondary">
                        Basmati Rice 6 <b style={{color:'#000'}}>X 1</b>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box>
                      <Grid container alignItems="center">
                          <Grid>
                            <Typography variant='subtitle2'>
                              <b>Rs. 500</b>
                            </Typography>
                          </Grid>
                          <Grid>
                            <IconButton onClick={handleClickOpen} size="small" aria-label="delete" className={classes.margin}>
                              <HighlightOffIcon fontSize="medium" />
                            </IconButton>
                          </Grid>
                      </Grid>
                     
                    </Box>
                    <Box>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Box>
                      <Typography variant='subtitle2' color="textSecondary">
                        Basmati Rice 6 <b style={{color:'#000'}}>X 1</b>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box>
                      <Grid container alignItems="center">
                          <Grid>
                            <Typography variant='subtitle2'>
                              <b>Rs. 500</b>
                            </Typography>
                          </Grid>
                          <Grid>
                            <IconButton  onClick={handleClickOpen} size="small" aria-label="delete" className={classes.margin}>
                              <HighlightOffIcon fontSize="medium" />
                            </IconButton>
                          </Grid>
                      </Grid>
                     
                    </Box>
                    <Box>
                    </Box>
                  </Grid>
                </Grid>
              </div>
              <Divider/>

              <div className={classes.tiles}>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant='subtitle2' color="textSecondary">
                      Price Total
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='caption'>
                      <b>Rs. 600</b>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant='subtitle2' color="textSecondary">
                      Selling Price Total
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle2'>
                      <b>Rs. 500</b>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant='subtitle2' color="textSecondary">
                      Discount Total
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle2' color="primary">
                      <b>- Rs. 100</b>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant='subtitle2' color="textSecondary">
                      Total Tax
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle2'>
                      <b>Rs. 0</b>
                    </Typography>
                  </Grid>
                </Grid>
              </div>
                
                <Divider/>
                <div className={classes.tiles}>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography variant='h5'>
                      <b>Total Cost</b>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='h5'>
                        <b>Rs. 500.00</b>
                      </Typography>
                    </Grid>
                  </Grid>
                </div>


          </Paper>   


            </Grid>
          </Grid>



             

      </div>
    </Container>
    </>
  );
}