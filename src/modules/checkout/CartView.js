import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { Stepper, Step, StepLabel, StepContent, Button, Grid, Paper, Typography, Divider, AppBar, Tabs, Tab, Box } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { HeadingBar, QtyController } from '../component/index'
import { useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { order, removeItem, updateItem } from '../../redux/actions/cart';
import { fetchDeliverySlots, selectDeliveryAddress, selectDeliverySlot, setPaymentType } from '../../redux/actions/app';
import { useHistory } from 'react-router-dom';
import { clearOrderPlaced } from '../../redux/actions/order';


const useStyles = makeStyles((theme) => ({

  cartOverview: {
    padding: 12
  },
  cartDetailRow: {
    display: 'flex',
    flexDirection: 'row',
    margin: '6px 0'
  },
  dateLabel: {
    display: 'block',
    fontSize: 12
  },
  center: {
    textAlign: 'center',
    '& .MuiTab-root': {
      minWidth: 100
    },
    '& .MuiTab-wrapper': {
      width: 'auto'
    }
  },
  content: {},
  editBtn: {},
  addressStyle: {
    border: '1px solid #ccc',
    '& $content': {
      padding: '15px',
      position: 'relative',
      '& $badge': {
        right: 10,
        top: 10,
        left: 'auto'
      },
      '& $editBtn': {
        marginTop: 20,
        textAlign: 'right'
      }
    },
  },

  stepLabel: {
    margin: ['12px 0px'],
  },
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },

  cardroot: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  thumb: {},
  cartDesign: {
    display: 'flex',
    flexDirection: 'row',
    margin: ['12px 0px'],
    alignItems: 'flex-end',
    '& $thumb': {
      marginRight: 10,
      position: 'relative',
      '& img': {
        width: 82,
        height: 82,
        objectFit: 'scale-down',
        minWidth: 82,
        padding: 7,
        borderRadius: 6
      }
    }
  },
  colorPrimary: {
    color: theme.palette.primary.main
  },
  cartItemPriceDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  badge: {
    position: 'absolute',
    left: 0,
    fontSize: 12,
    color: '#ff6000',
    backgroundColor: '#ffe7d9',
    padding: theme.spacing(0.5, 1.2),
    borderRadius: 4,
    display: 'inline-block',
    fontWeight: 600,
  },
}));





function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}


const CartItem = [
  { id: 1, name: 'Bread', image: 'https://www.zoovi.in/kisanhaat/img/cart/g1.png', oldPrice: '1.20', newPrice: '0.98', sellPrice: '2.82', disPercent: '10' },
  { id: 2, name: 'Spinach', image: 'https://www.zoovi.in/kisanhaat/img/cart/g2.png', oldPrice: '1.20', newPrice: '0.98', sellPrice: '2.82', disPercent: '0' },
  { id: 3, name: 'Chilli', image: 'https://www.zoovi.in/kisanhaat/img/cart/g3.png', oldPrice: '1.20', newPrice: '0.98', sellPrice: '2.82', disPercent: '0' },
]

function getSteps(cartLength) {
  return [` Cart (${cartLength} items)`, 'Order Address', 'Delivery Time', 'Payment'];
}


export function CartItems() {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [addProduct, setAddProduct] = useState({});
  // const isFocused = useIsFocused();
  const settings = useSelector(state => state.app.settings);

  const handleQtyDec = (cartItem) => {
    dispatch(removeItem(cartItem));
  }

  const handleQtyInc = (cartItem) => {
    dispatch(updateItem(cart?.items || [], cartItem));
  }


  return (
    <>
      <Divider />
      {cart?.items?.map((items) => (
        <>
          <div className={classes.cartDesign}>
            <div className={classes.thumb}>
              {items.discountPercentage > 0 &&
                <span className={classes.badge} color="textSecondary" gutterBottom>
                  {items.discountPercentage}%
                </span>
              }
              <img src={items.image} />
            </div>
            <div style={{ flex: 1 }}>
              <Typography variant="h5"><b>{items.product_name}</b></Typography>
              <Typography variant='caption' color={'textPrimary'}>
                <strike style={{ color: theme.palette.primary.main, marginRight: 6 }}>₹{items.price}/{items.displayWeight}</strike>

              </Typography>
              <div className={classes.cartItemPriceDiv}>
                <div style={{ flex: 1 }}>
                  <Typography variant='h6'><b>₹{items.discountedPrice}/{items.displayWeight}</b></Typography>
                </div>
                <QtyController qty={items.qty} cartItem={items} handleQtyDec={handleQtyDec} handleQtyInc={handleQtyInc} disabled={cart?.cartLoading} />
              </div>
            </div>
          </div>
          <Divider />
        </>
      ))}
    </>
  )
}


export function AddressList() {
  const classes = useStyles();
  const addresses = useSelector(state => state.address.addresses);
  const deliveryAddress = useSelector(state => state.app.address);
  const dispatch = useDispatch();
  return (
    <Grid container spacing={3}>
      {addresses?.map(address => (<Grid item lg={6}>
        <div className={classes.addressStyle}>
          <div className={classes.addressType}>
            <div className={classes.content}>
              <Typography><b>{address.type?.type}</b></Typography>
              {address.default_address && <span className={classes.badge} color="textSecondary" gutterBottom>
                Default
              </span>}
              <Typography variant="caption">
                {address.address1}, {address.address2}, {address.city}, {address.state} {address.pincode}
              </Typography>
              <div className={classes.editBtn}>
                <Button variant="outlined" color="primary">
                  Edit
                </Button>
              </div>
            </div>
            <Button
              variant="contained"
              disableElevation
              color={address.address_id === deliveryAddress?.address_id ? "primary" : "inherit"}
              fullWidth
              onClick={() => dispatch(selectDeliveryAddress(address))}
            >
              Deliver Here
            </Button>
          </div>
        </div>
      </Grid>))}

    </Grid>
  )
}

export function TimeSlot() {
  const [value, setValue] = React.useState(0);
  const [time, setTime] = React.useState(null);
  const classes = useStyles();
  const deliverySlots = useSelector(state => state.app.deliverySlots);
  const selectedSlot = useSelector(state => state.app.selectedDeliverySlot || {});
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const timeSelect = (event) => {
    // setTime(event.target.value);
    const id = event.target.value;
    const newSlot = deliverySlots?.find(slot => slot.id == id);
    console.log(newSlot);
    dispatch(selectDeliverySlot(newSlot));
  };

  useEffect(() => {
    dispatch(fetchDeliverySlots());
  }, []);

  useEffect(() => {
    if (selectedSlot) setTime(selectedSlot?.id);
  }, [selectedSlot]);

  return (
    <div>
      <div className={classes.center}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            // variant="scrollable"
            scrollButtons="auto"
            aria-label="simple tabs example"
          // aria-label="scrollable auto tabs example"
          >
            <Tab label={<div><b>MON</b><span className={classes.dateLabel}>7 Sep</span></div>} {...a11yProps(0)} />
            {/* <Tab label={<div><b>TUE</b><span className={classes.dateLabel}>8 Sep</span></div>}  {...a11yProps(1)} />
            <Tab label={<div><b>WED</b><span className={classes.dateLabel}>9 Sep</span></div>}  {...a11yProps(2)} />
            <Tab label={<div><b>THU</b><span className={classes.dateLabel}>10 Sep</span></div>}  {...a11yProps(3)} /> */}
          </Tabs>
        </AppBar>
      </div>
      <TabPanel value={value} index={0}>

        <RadioGroup aria-label="gender" name="gender1" value={selectedSlot?.id || null} onChange={timeSelect}>
          {deliverySlots && deliverySlots.map((item) => (
            <FormControlLabel classes={{ label: classes.small }} className={classes.filterItem} value={item.id} control={<Radio color="primary" />} label={item.from_time + " - " + item.to_time} />
          ))}
          {/* <FormControlLabel classes={{ label: classes.small }} className={classes.filterItem} value="4PM - 6AM" control={<Radio color="primary" />} label="Nearest Me" />
          <FormControlLabel classes={{ label: classes.small }} className={classes.filterItem} value="6PM - 9PM" control={<Radio color="primary" />} label="Cost High to Low" />
          <FormControlLabel classes={{ label: classes.small }} className={classes.filterItem} value="0AM - 1PM" control={<Radio color="primary" />} label="Cost Low to High" /> */}
        </RadioGroup>

      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel> */}
    </div>
  )
}

export function PaymentType() {
  const paymentType = useSelector(state => state.app.paymentType);
  const dispatch = useDispatch();
  return (
    <div>
      <Button
        color={(paymentType == "ONLINE") ? "primary" : ""}
        variant={(paymentType == "ONLINE") ? "contained" : ""}
        onClick={() => dispatch(setPaymentType("ONLINE"))}
      >
        Online
      </Button>
      <Button
        color={(paymentType == "COD") ? "primary" : ""}
        variant={(paymentType == "COD") ? "contained" : ""}
        onClick={() => dispatch(setPaymentType("COD"))}
      >
        COD
      </Button>
    </div>
  )
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CartItems />;
    case 1:
      return <AddressList />;
    case 2:
      return <TimeSlot />;
    case 3:
      return <PaymentType />;
    default:
      return 'Unknown step';
  }
}



export default function CartView() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const cart = useSelector(state => state.cart);
  const steps = getSteps(cart.totalCount);
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const paymentType = useSelector(state => state.app.paymentType);
  const deliveryAddress = useSelector(state => state.app.address);
  const settings = useSelector(state => state.app.settings);
  const selectedSlot = useSelector(state => state.app.selectedDeliverySlot);
  const couponCode = cart.appliedCoupon ? cart.appliedCoupon.coupon_code : "";
  const orderSuccess = useSelector(state => state.order.orderSuccess);

  const paymentGateway = () => {

    const tempKey = settings ? settings.payment_gateway_key_id : "";
    let key = tempKey;
    let desc = `Payment for your ${settings ? settings.app_name : "app"} order.`;
    if (!tempKey.startsWith("rzp")) {
      key = "rzp_test_iYyMOgeWEasQXo";
      desc = `Demo Payment for your ${settings ? settings.app_name : "app"} order.`;
    }

    var options = {
      description: desc,
      image: settings.app_logo,
      currency: 'INR',
      key: key,
      amount: cart.total * 100,
      name: settings ? settings.app_name : "app",
      //order_id: res.id,//Replace this with an order_id created using Orders API.
      prefill: {
        email: user && user.email,
        contact: user && user.mobile,
        name: user && user.name
      },
      theme: { color: '#53a20e' },
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
        dispatch(order(deliveryAddress, "online", selectedSlot.id, cart.couponDiscount, cart.appliedCoupon ? cart.appliedCoupon : null, response.razorpay_payment_id));
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {

      // alert(response.error.description);

    });

    return rzp1;
  }


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    console.log("ORDER SUCCESS TRIGGERED", orderSuccess);
    if (orderSuccess) {
      console.log("ORDER SUCCESS TRIGGERED TRUE");
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Success' }],
      // });
      history.replace("/orders");
      dispatch(clearOrderPlaced());
    }
  }, [orderSuccess]);

  const handlePayment = () => {
    let error = false;
    if (!!deliveryAddress) {
      error = true;
      alert("Select Delivery Address");
    }
    if (!!selectedSlot) {
      error = true;
      alert("Select Delivery Slot");
    }

    if (error) return;

    if (paymentType == "COD") {
      dispatch(order(deliveryAddress, "cod", selectedSlot.id, cart.couponDiscount, cart.appliedCoupon ? cart.appliedCoupon : null));
    }
    if (paymentType == "ONLINE") {
      const pgw = paymentGateway();
      pgw.open();
    }
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item lg={8}>

            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel className={{ root: classes.stepLabel }}>{label}</StepLabel>
                  <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset} className={classes.button}>
                  Reset
                </Button>
                <Button onClick={handlePayment} className={classes.button} variant="contained" color="primary">
                  Make Payment
                </Button>
              </Paper>
            )}

          </Grid>

          <Grid item lg={4}>
            <Paper>
              <div className={classes.cartOverview}>
                <Typography><b>Bill Details</b></Typography>
                <div className={classes.cartDetailRow}>
                  <div className={classes.content}>
                    <Typography color="textSecondary"><span style={{ color: '#000' }}>Price</span> ({cart?.totalCount} item(s))</Typography>

                  </div>
                  <Typography><b>₹{cart?.subTotal}</b></Typography>
                </div>
                <div className={classes.cartDetailRow}>
                  <div className={classes.content}>
                    <Typography color="textSecondary"><span style={{ color: '#000' }}>Selling Price Total</span> ({cart?.totalCount} item(s))</Typography>

                  </div>
                  <Typography><b>₹{cart?.priceTotal}</b></Typography>
                </div>
                <div className={classes.cartDetailRow}>
                  <div className={classes.content}>
                    <Typography>Discount Total</Typography>

                  </div>
                  <Typography><b>₹{cart?.totalDiscount}</b></Typography>
                </div>
                <div className={classes.cartDetailRow}>
                  <div className={classes.content}>
                    <Typography color="textSecondary"><span style={{ color: '#000' }}>Taxes</span></Typography>

                  </div>
                  <Typography><b>₹{cart?.totalTax}</b></Typography>
                </div>
                <div className={classes.cartDetailRow}>
                  <div className={classes.content}>
                    <Typography color="textSecondary"><span style={{ color: '#000' }}>Delivery Charges</span></Typography>

                  </div>
                  <Typography><b>₹{cart?.deliveryCharge}</b></Typography>
                </div>
                <Divider />
                <Typography variant="subtitle2" color={"textSecondary"}>Your Total Savings on this order ₹{cart?.totalDiscount + cart?.couponDiscount}</Typography>
                <Divider />
                <div className={classes.cartDetailRow}>
                  <div className={classes.content}>
                    <Typography variant="h5">To Pay</Typography>
                  </div>
                  <Typography variant="h5" color={'error'}>₹{cart?.total}</Typography>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>

      </div>
    </>
  );
}