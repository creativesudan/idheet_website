import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { Stepper, Step, StepLabel, StepContent, Button, Grid, Paper, Typography, Divider, AppBar, Tabs, Tab, Box, TextField } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';

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

import { HeadingBar, QtyController } from '../component/index'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { addCouponToCart, order, removeItem, updateItem } from '../../redux/actions/cart';
import { fetchDeliverySlots, selectDeliveryAddress, selectDeliverySlot, setPaymentType } from '../../redux/actions/app';
import { useHistory } from 'react-router-dom';
import { clearOrderPlaced } from '../../redux/actions/order';
import { deleteAddress, saveAddress, updateAddAddressField, updateAddress, updateAddressField, updateEditAddressField, verifyPincode } from '../../redux/actions/address';
import lazyLoad from '../../redux/actions/lazyLoad';
import Snackbar from '../component/Snackbar';



const useStyles = makeStyles((theme) => ({

  subscriber: {
    margin: '20px 0'
  },
  subscriberBtn: {
    width: '100%',
    height: 40,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginTop: 10
  },
  subcribeField: {
    width: '100%',
    borderTopRightRadius: 0,

  },
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
    textAlign: 'right',
    marginRight: -8,
    marginTop: theme.spacing(2),
    // margin: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  deliveryMsg: {
    padding: '15px',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
    margin: '15px 0',
    backgroundColor: '#f7f7f7',
    textAlign: 'center'
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
  dailog_width: {
    minWidth: 400
  },
  addressField: {
    margin: '15px 0'
  }
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
                <QtyController product_id={items.product_id} displayWeight={items.displayWeight} />
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
  const theme = useTheme();



  const newAddress = {
    type: { type: "Home", id: 1 }
  }
  const [editAccount, setEditAccount] = useState(false);
  const [addAccount, setAddAccount] = useState(false);
  const addAddress = useSelector(state => state.address.addAddress || {});
  const editAddress = useSelector(state => state.address.editAddress || {});



  const handleClickOpen = (address) => {
    setEditAccount(true);
    dispatch(updateAddressField("editAddress", address))
  };

  const handleClose = () => {
    setEditAccount(false);
  };

  const AddOpen = () => {
    setAddAccount(true);
    dispatch(updateAddressField("addAddress", newAddress));
  };

  const AddClose = () => {
    setAddAccount(false)
  };


  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [formats, setFormats] = React.useState(editAddress?.type?.id);

  const handleFormat = (event, newFormats) => {
    // setFormats(newFormats);
    dispatch(updateEditAddressField("type", { "id": newFormats }))

  };

  const handleAddType = (event, newFormats) => {
    // setFormats(newFormats);
    dispatch(updateAddAddressField("type", { "id": newFormats }))

  };

  return (
    <>
      <Dialog
        open={editAccount}
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><b>Edit Address</b></DialogTitle>
        <DialogContent>
          <div className={classes.dailog_width}>
            <div style={{ marginBottom: 30 }}>
              <ToggleButtonGroup value={editAddress?.type?.id} size="small" onChange={handleFormat} exclusive aria-label="text formatting">
                <ToggleButton value={1} aria-label={1}>
                  <b>Home</b>
                </ToggleButton>
                <ToggleButton value={0} aria-label={0}>
                  <b>Office</b>
                </ToggleButton>
                <ToggleButton value={2} aria-label={2}>
                  <b>Other</b>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Address Line 1"
                variant="outlined"
                size="small"
                fullWidth
                value={editAddress.address1 || ""}
                onChange={(e) => {
                  dispatch(updateEditAddressField("address1", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Address Line 2"
                variant="outlined"
                size="small"
                fullWidth
                value={editAddress.address2 || ""}
                onChange={(e) => {
                  dispatch(updateEditAddressField("address2", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="pincode"
                variant="outlined"
                size="small"
                fullWidth
                value={editAddress.pincode || ""}
                onChange={(e) => {
                  dispatch(updateEditAddressField("pincode", e.target.value))
                }}
                onBlur={() => dispatch(lazyLoad(verifyPincode(editAddress.pincode)))}
              />
              {editAddress.error && <p>{editAddress.error}</p>}
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Enter City"
                variant="outlined"
                size="small"
                fullWidth
                value={editAddress.city || ""}
                onChange={(e) => {
                  dispatch(updateEditAddressField("city", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Enter State"
                variant="outlined"
                size="small"
                fullWidth
                value={editAddress.state || ""}
                onChange={(e) => {
                  dispatch(updateEditAddressField("state", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Enter Phone"
                variant="outlined"
                size="small"
                fullWidth
                value={editAddress.phone || ""}
                onChange={(e) => {
                  dispatch(updateEditAddressField("phone", e.target.value))
                }}
              />
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={editAddress.default_address || false}
                  name="checkedB"
                  color="primary"
                  onClick={() => dispatch(updateEditAddressField("default_address", !editAddress.default_address))}
                />
              }
              label="Default Address"
            />


          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={() => dispatch(updateAddress(editAddress)).then(() => setEditAccount(false))} color="primary" autoFocus
            disabled={

              (editAddress.address1 ? editAddress.address1.length < 2 : true) ||

              (editAddress.city ? editAddress.city.length < 2 : true) ||
              (editAddress.state ? editAddress.state.length < 2 : true) ||
              (editAddress.pincode ? editAddress.pincode.length !== 6 : true) ||
              (editAddress.phone ? editAddress.phone.length !== 10 : true) ||
              !editAddress.pincode_verified

            }
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>










      <Dialog
        open={addAccount}
        fullScreen={fullScreen}
        onClose={AddClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><b>Add Address</b></DialogTitle>
        <DialogContent>
          <div className={classes.dailog_width}>
            <ToggleButtonGroup value={addAddress?.type?.id} size="small" onChange={handleAddType} exclusive aria-label="text formatting">
              <ToggleButton value={1} aria-label="bold">
                <b>Home</b>
              </ToggleButton>
              <ToggleButton value={0} aria-label="italic">
                <b>office</b>
              </ToggleButton>
              <ToggleButton value={2} aria-label="underlined">
                <b>Other</b>
              </ToggleButton>
            </ToggleButtonGroup>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Address Line 1"
                variant="outlined"
                size="small"
                fullWidth
                value={addAddress.address1 || ""}
                onChange={(e) => {
                  dispatch(updateAddAddressField("address1", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Address Line 2"
                variant="outlined"
                size="small"
                fullWidth
                value={addAddress.address2 || ""}
                onChange={(e) => {
                  dispatch(updateAddAddressField("address2", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="pincode"
                variant="outlined"
                size="small"
                fullWidth
                value={addAddress.pincode || ""}
                onChange={(e) => {
                  dispatch(updateAddAddressField("pincode", e.target.value))
                }}
                onBlur={() => dispatch(lazyLoad(verifyPincode(addAddress.pincode)))}
              />
              {addAddress.error && <p>{addAddress.error}</p>}
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Enter City"
                variant="outlined"
                size="small"
                fullWidth
                value={addAddress.city || ""}
                onChange={(e) => {
                  dispatch(updateAddAddressField("city", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Enter State"
                variant="outlined"
                size="small"
                fullWidth
                value={addAddress.state || ""}
                onChange={(e) => {
                  dispatch(updateAddAddressField("state", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Enter Phone"
                variant="outlined"
                size="small"
                fullWidth
                value={addAddress.phone || ""}
                onChange={(e) => {
                  dispatch(updateAddAddressField("phone", e.target.value))
                }}
              />
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={addAddress.default_address || false}
                  name="checkedB"
                  color="primary"
                  onChange={(e) => {
                    dispatch(updateAddAddressField("default_address", !addAddress.default_address))
                  }}
                />
              }
              label="Default Address"
            />


          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={AddClose} color="primary">
            Close
          </Button>
          <Button onClick={() => dispatch(saveAddress(addAddress)).then(() => setAddAccount(false))} color="primary" autoFocus
            disabled={

              (addAddress.address1 ? addAddress.address1.length < 2 : true) ||

              (addAddress.city ? addAddress.city.length < 2 : true) ||
              (addAddress.state ? addAddress.state.length < 2 : true) ||
              (addAddress.pincode ? addAddress.pincode.length !== 6 : true) ||
              (addAddress.phone ? addAddress.phone.length != 10 : true) ||
              !addAddress.pincode_verified
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

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
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleClickOpen(address)}
                  >
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
      <div className={classes.button}>
        <Button
          variant="outlined"
          color="primary"
          onClick={AddOpen}
          fullWidth={true}
        >
          Add New
        </Button>
      </div>
    </>
  )
}

export function TimeSlot() {
  const [value, setValue] = React.useState(0);
  const [time, setTime] = React.useState(null);
  const classes = useStyles();
  const deliverySlots = useSelector(state => state.app.deliverySlots);
  const selectedSlot = useSelector(state => state.app.selectedDeliverySlot || {});
  const settings = useSelector(state => state.app.settings);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const timeSelect = (event) => {
    // setTime(event.target.value);
    const id = event.target.value;
    const newSlot = deliverySlots?.find(slot => slot.id == id);
    // console.log(newSlot);
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

      <div className={classes.deliveryMsg}>
        <Typography variant="subtitle2">
          {settings?.delivery_msg}
        </Typography>
      </div>

      <RadioGroup aria-label="gender" name="gender1" value={selectedSlot?.id || null} onChange={timeSelect}>
        {deliverySlots && deliverySlots.map((item) => (
          <FormControlLabel classes={{ label: classes.small }} className={classes.filterItem} value={item.id} control={<Radio color="primary" />} label={item.from_time + " - " + item.to_time} />
        ))}
        {/* <FormControlLabel classes={{ label: classes.small }} className={classes.filterItem} value="4PM - 6AM" control={<Radio color="primary" />} label="Nearest Me" />
          <FormControlLabel classes={{ label: classes.small }} className={classes.filterItem} value="6PM - 9PM" control={<Radio color="primary" />} label="Cost High to Low" />
          <FormControlLabel classes={{ label: classes.small }} className={classes.filterItem} value="0AM - 1PM" control={<Radio color="primary" />} label="Cost Low to High" /> */}
      </RadioGroup>

    </div>
  )
}

export function PaymentType() {
  const paymentType = useSelector(state => state.app.paymentType);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <div>


      <RadioGroup aria-label="gender" name="gender1" value={paymentType}>
        <FormControlLabel onClick={() => dispatch(setPaymentType("ONLINE"))} classes={{ label: classes.small }} className={classes.filterItem} value="ONLINE" control={<Radio color="primary" />} label="Online" />
        <FormControlLabel onClick={() => dispatch(setPaymentType("COD"))} classes={{ label: classes.small }} className={classes.filterItem} value="COD" control={<Radio color="primary" />} label="COD" /></RadioGroup>

      {/* <Button
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
      </Button> */}
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

  const [snackbar, setSnackbar] = React.useState({ open: false });



  const [couponState, setCouponState] = useState(null);

  useEffect(() => {
    if (couponCode) setCouponState(couponCode);
  }, [couponCode]);

  useEffect(() => {
    if (cart.items?.length == 0) history.push("/");
  }, [cart.items]);



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
    if (!cart.orderAllowed) {
      // alert("Subtotal should be more than " + (settings ? settings.min_order_value : ""));
      // setSnackbar({ open: true, message: "Subtotal should be more than " + (settings ? settings.min_order_value : "") });
      Snackbar.show("Subtotal should be more than " + (settings ? settings.min_order_value : ""));
      return;
    }
    let error = false;
    if (activeStep == 1 && !deliveryAddress) {
      error = true;
      // alert("Select Delivery Address");
      // setSnackbar({ open: true, message: "Select Delivery Address" });
      Snackbar.show("Select Delivery Address");


    }
    if (activeStep == 2 && !selectedSlot) {
      error = true;
      // alert("Select Delivery Slot");
      // setSnackbar({ open: true, message: "Select Delivery Slot" });
      Snackbar.show("Select Delivery Slot");

    }
    if (activeStep == 3) {
      handlePayment();
      return;
    }
    if (error) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    // console.log("ORDER SUCCESS TRIGGERED", orderSuccess);
    if (orderSuccess) {
      // console.log("ORDER SUCCESS TRIGGERED TRUE");
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
    if (!deliveryAddress) {
      error = true;
      alert("Select Delivery Address");
    }
    if (!selectedSlot) {
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
      {/* <Snackbar message={snackbar.message} open={snackbar.open} onClose={() => setSnackbar({ open: false })} /> */}
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
                          {activeStep === steps.length - 1 ? 'Pay Now' : 'Next'}
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
                <Typography variant={'h5'} gutterBottom><b>Bill Details</b> <br /></Typography>




                <div className={classes.cartDetailRow}>
                  <div className={classes.content}>
                    <Typography variant="subtitle2" color="textSecondary"><span style={{ color: '#000' }}>Price</span> ({cart?.totalCount} item(s))</Typography>

                  </div>
                  <Typography><b>₹{cart?.subTotal}</b></Typography>
                </div>
                <div className={classes.cartDetailRow}>
                  <div className={classes.content}>
                    <Typography variant="subtitle2" color="textSecondary"><span style={{ color: '#000' }}>Selling Price Total</span> ({cart?.totalCount} item(s))</Typography>

                  </div>
                  <Typography><b>₹{cart?.priceTotal}</b></Typography>
                </div>
                <div className={classes.cartDetailRow}>
                  <div className={classes.content}>
                    <Typography variant="subtitle2">Discount Total</Typography>

                  </div>
                  <Typography><b>₹{cart?.totalDiscount}</b></Typography>
                </div>
                <div className={classes.cartDetailRow}>
                  <div className={classes.content}>
                    <Typography variant="subtitle2" color="textSecondary"><span style={{ color: '#000' }}>Taxes</span></Typography>

                  </div>
                  <Typography><b>₹{cart?.totalTax}</b></Typography>
                </div>
                {cart?.appliedCoupon && <div className={classes.cartDetailRow}>
                  <div className={classes.content}>
                    <Typography color="textSecondary"><span style={{ color: '#000' }}>Coupon Discount</span></Typography>

                  </div>
                  <Typography><b>₹{cart?.couponDiscount}</b></Typography>
                </div>}
                {cart?.deliveryCharge > 0 && <div className={classes.cartDetailRow}>
                  <div className={classes.content}>
                    <Typography color="textSecondary"><span style={{ color: '#000' }}>Delivery Charges</span></Typography>

                  </div>
                  <Typography><b>₹{cart?.deliveryCharge}</b></Typography>
                </div>}


                <form className={classes.subscriber} noValidate autoComplete="off">
                  <TextField
                    id="outlined-basic"
                    label="Code"
                    variant="outlined"
                    size="small"
                    classes={{ root: classes.subcribeField }}
                    value={couponState}
                    onChange={e => setCouponState(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    classes={{ root: classes.subscriberBtn }}
                    onClick={() => dispatch(addCouponToCart(couponState))}
                  >
                    Apply Code
                  </Button>
                </form>

                <Divider />
                <div style={{ padding: '10px 0px' }}>
                  <Typography variant="subtitle2" color={"textSecondary"}>Your Total Savings on this order ₹{cart?.totalDiscount + cart?.couponDiscount}</Typography>
                </div>
                <Divider />

                <div style={{ padding: '10px 0px' }}>

                  <div className={classes.cartDetailRow}>
                    <div className={classes.content}>
                      <Typography variant="h5">To Pay</Typography>
                    </div>
                    <Typography variant="h5" color={'error'}>₹{cart?.total}</Typography>
                  </div>
                </div>

              </div>
            </Paper>
          </Grid>
        </Grid>

      </div>
    </>
  );
}