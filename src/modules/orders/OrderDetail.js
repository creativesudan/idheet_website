import React, { useEffect, useState } from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Breadcrumbs, Typography, Paper, Grid, Divider, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import CloseIcon from '@material-ui/icons/Close';

import { CustomBadge } from '../component/index'
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
import { Link, useHistory, useParams } from 'react-router-dom';
import { cancelCompleteOrder, cancelOrderItem, fetchOrderById } from '../../redux/actions/order';
import { ORDER_STATUS } from './OrderListing';


const useStyles = makeStyles((theme) => ({
  sectionGap: {
    margin: theme.spacing(6, 0)
  },
  BreadcrumbsContainer: {
    padding: '20px 0',
    background: '#e9ecef'
  },
  tiles: {
    padding: '10px 20px'
  },
  capital:{
    textTransform:'capitalize'
  }
}))

function ConfirmMessage({ title, message, handleYes, handleNo, open }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleNo}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title"><b>{title}</b></DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleYes} color="primary">
          Yes
        </Button>
        <Button color="default" variant="outlined" onClick={handleNo} autoFocus>
          Not Now
        </Button>
      </DialogActions>
    </Dialog>
  )
}


export default function OrderDetail() {
  const classes = useStyles();
  const user = useSelector(state => state.auth.user);
  const { order_id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector(state => state.order.activeOrder);
  const history = useHistory();

  const [openCancelItem, setOpenCancelItem] = React.useState(false);
  const [openCancelOrder, setOpenCancelOrder] = React.useState(false);
  const [cancelItemId, setCancelItemId] = React.useState(null);




  const handleItemOpen = () => {
    setOpenCancelItem(true);
  };

  const handleOrderOpen = () => {
    setOpenCancelOrder(true);
  };

  const handleItemNo = () => {
    setOpenCancelItem(false);
  };


  const handleOrderNo = () => {
    setOpenCancelOrder(false);
  };

  const handleItemYes = () => {
    dispatch(cancelOrderItem(cancelItemId)).
      then(() => {
        dispatch(fetchOrderById(order_id));
        setOpenCancelItem(false);
      });
  };


  const handleOrderYes = () => {
    dispatch(cancelCompleteOrder(order?.id)).then(() => history.goBack());
  };

  useEffect(() => {
    if (order_id) dispatch(fetchOrderById(order_id));
  }, [order_id]);
  return (
    <>
      <ConfirmMessage title="Cancel Item?" message="Are you Sure you want to cancel this item?" handleYes={handleItemYes} handleNo={handleItemNo} open={openCancelItem} />
      <ConfirmMessage title="Cancel Order?" message="Are you Sure you want to cancel this order?" handleYes={handleOrderYes} handleNo={handleOrderNo} open={openCancelOrder} />


      <div className={classes.BreadcrumbsContainer}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" to="/">
              <Typography color="primary">Home</Typography>
            </Link>
            <Link color="primary" to="/orders">
              <Typography color="primary">My Orders</Typography>
            </Link>
            <Typography color="textPrimary">{order?.order_no}</Typography>
          </Breadcrumbs>
        </Container>
      </div>
      <Container>
        <div className={classes.sectionGap}>


          <Grid container spacing={3}>
            <Grid item md={4} sm={12} xs={12}>
              <LeftPanel user={user} />
            </Grid>
            <Grid item md={8} sm={12} xs={12}>

              <Paper>
                <div className={classes.tiles}>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant='subtitle2' color="textSecondary">
                        {order?.created_at}
                      </Typography>
                    </Grid>
                    {(order?.order_status == ORDER_STATUS["pending"] || order?.order_status == ORDER_STATUS["ongoing"]) && <Grid item>
                      <Button onClick={() => {
                        handleOrderOpen();
                      }} variant="contained" color="primary" size="large">Cancel Order</Button>
                    </Grid>}
                  </Grid>
                </div>
                <Divider />

                <div className={classes.tiles}>
                  <Typography variant='h5' color="textPrimary">
                    <b>Order Status</b>
                  </Typography>
                  <Box>
                    <Typography variant='subtitle2' color="textSecondary" className={classes.capital}>
                      {order?.order_status}
                    </Typography>
                  </Box>
                </div>
                <Divider />

                <div className={classes.tiles}>
                  <Typography variant='h5' color="textPrimary">
                    <b>Destination</b>
                  </Typography>
                  <Box>
                    <Typography variant='subtitle2' color="textSecondary">
                      {order?.address1}, {order?.address2}, {order?.city}, {order?.state} {order?.pincode}
                    </Typography>
                  </Box>
                </div>
                <Divider />

                <div className={classes.tiles}>
                  <Typography variant='h5' color="textPrimary">
                    <b>Payment Type</b>
                  </Typography>
                  <Box>
                    <Typography variant='subtitle2' color="textSecondary">
                      {order?.payment_type?.toUpperCase()}
                    </Typography>
                  </Box>
                </div>
                <Divider />

                <div className={classes.tiles}>
                  <Typography variant='h5' color="textPrimary">
                    <b>Items</b>
                  </Typography>
                  {order?.items?.map(item => <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <Box>
                        <Typography variant='subtitle2' color="textSecondary">
                          {item.product_name} ({item.displayWeight}) <b style={{ color: '#000' }}>X {item.qty}</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box>
                        <Grid container alignItems="center">
                          <Grid>
                            <Typography variant='subtitle2'>
                              <b>Rs. {item.total}</b>
                            </Typography>
                          </Grid>
                          <Grid>
                            {item.status == "ordered" && order?.order_status != ORDER_STATUS["cancelled"] && order?.order_status != ORDER_STATUS["delivered"] && <IconButton onClick={() => {
                              setCancelItemId(item.item_id);
                              handleItemOpen();
                            }} size="small" aria-label="delete" className={classes.margin}>
                              <HighlightOffIcon fontSize="medium" />
                            </IconButton>}
                          </Grid>
                        </Grid>

                      </Box>
                      <Box>
                      </Box>
                    </Grid>
                  </Grid>
                  )}

                </div>
                <Divider />

                <div className={classes.tiles}>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography variant='subtitle2' color="textSecondary">
                        Price Total
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='caption'>
                        <b>Rs. {order?.sub_total}</b>
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
                        <b>Rs. {order?.sub_total - order?.total_discount}</b>
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
                        <b>- Rs. {order?.total_discount}</b>
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
                        <b>Rs. {order?.total_tax_amount}</b>
                      </Typography>
                    </Grid>
                  </Grid>
                  {(order?.delivery_charge != 0) && <Grid container justify="space-between">
                    <Grid item>
                      <Typography variant='subtitle2' color="textSecondary">
                        Delivery Charge
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='subtitle2'>
                        <b>Rs. {order?.delivery_charge}</b>
                      </Typography>
                    </Grid>
                  </Grid>}
                  {(order?.coupon_value != 0) && <Grid container justify="space-between">
                    <Grid item>
                      <Typography variant='subtitle2' color="textSecondary">
                        Coupon Discount
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='subtitle2'>
                        <b>Rs. {order?.coupon_value}</b>
                      </Typography>
                    </Grid>
                  </Grid>}
                  {(order?.total_cancelled_amount != 0) && <Grid container justify="space-between">
                    <Grid item>
                      <Typography variant='subtitle2' color="textSecondary">
                        Cancellation Amount
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='subtitle2'>
                        <b>Rs. {order?.total_cancelled_amount}</b>
                      </Typography>
                    </Grid>
                  </Grid>}
                </div>

                <Divider />
                <div className={classes.tiles}>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography variant='h5'>
                        <b>Total Cost</b>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='h5'>
                        <b>Rs. {order?.grant_total}</b>
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