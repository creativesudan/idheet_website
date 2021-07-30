import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Grid, Box, Paper, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import { HeadingBar, QtyController, Rating } from '../component/index'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { getCartItem } from '../../redux/lib/cart';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateItem } from '../../redux/actions/cart';
import { useHistory } from 'react-router-dom';
import { sendEnquiry } from '../../redux/actions/app';



const useStyles = makeStyles((theme) => ({
  categoryBox: {
    textAlign: 'center',
    '& img': {
      width: '100%',
      display: 'inline-block',
      maxHeight: 500,
      objectFit: 'cover',
      objectPosition: 'center'
    }
  },
  largeBtn: {
    height: theme.spacing(7)
  },
  badge: {
    fontSize: 12,
    color: '#ff6000',
    backgroundColor: '#ffe7d9',
    padding: theme.spacing(0.5, 1.2),
    borderRadius: 4,
    display: 'inline-block',
    fontWeight: 600, marginLeft: 10
  },
  bigName: {
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(3),
  },
  reviews: {
    marginTop: theme.spacing(0.8)
  },
  toggleContainer: {
    margin: theme.spacing(2, 0),
  },
  toggleBtn: {
    borderRadius: theme.spacing(4),
    padding: theme.spacing(0.7, 2),
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    '&$selectedBtn': {
      background: `${theme.palette.primary.main}!important`,
      color: '#fff'
    }
  },
  selectedBtn: {
    background: theme.palette.primary.main,
  },
  dailog_width: {
    minWidth: 400
  },
  formField: {
    margin: '15px 0'
  }
}))


export default function DetailView({ product }) {
  const classes = useStyles();
  const theme = useTheme();
  const [enquire, setEnquire] = React.useState(null);

  useEffect(() => {
    setSelectedVariant(product.defaultVariant);
    setEnquire({ product_id: product.id, qty: 0 });
  }, [product]);

  const cartItems = useSelector(state => state.cart.items);
  const cartLoading = useSelector(state => state.cart.cartLoading);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const cartItem = getCartItem(cartItems, product);
  const dispatch = useDispatch();
  const history = useHistory();
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const [selectedVariant, setSelectedVariant] = React.useState(product.defaultVariant);


  const handleVariant = (event, newVariant) => {

    if (newVariant !== null && product.variants) {
      setSelectedVariant(product.variants.find(item => item.id == newVariant));
    }
  };

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleQtyDec = (cartItem) => {
    dispatch(removeItem(cartItem));
  }

  const handleQtyInc = (cartItem) => {
    dispatch(updateItem(cartItems, cartItem));
  }

  const [enquiry, setEnquiry] = React.useState(false);


  const EnquiryClose = () => {
    setEnquiry(false);
  }
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <>

      <Dialog
        open={enquiry}
        fullScreen={fullScreen}
        onClose={EnquiryClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><b>Enquiry Now</b></DialogTitle>
        <DialogContent>
          <div className={classes.dailog_width}>

            <div className={classes.formField}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
                fullWidth
                value={user?.name}
                disabled
              />
            </div>

            <div className={classes.formField}>
              <TextField
                id="outlined-basic"
                label="Number"
                variant="outlined"
                size="small"
                fullWidth
                value={user?.mobile}
                disabled
              />
            </div>

            <div className={classes.formField}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                size="small"
                fullWidth
                value={user?.email}
                disabled
              />
            </div>

            <div className={classes.formField}>
              <TextField
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                size="Quantity"
                fullWidth
                value={enquire?.qty}
                onChange={(e) => setEnquire({ ...enquire, qty: e.target.value })}
              />
            </div>

            <div className={classes.formField}>
              <TextField
                id="outlined-basic"
                label="Message"
                variant="outlined"
                size="small"
                fullWidth
                value={enquire?.message}
                onChange={(e) => setEnquire({ ...enquire, message: e.target.value })}
              />
            </div>



          </div>
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={() => setEnquiry(false)}>
            Close
          </Button>
          <Button color="primary" autoFocus onClick={() => {
            dispatch(sendEnquiry(enquire)).then(() =>
              setEnquiry(false));
          }}>
            Send Enquiry
          </Button>
        </DialogActions>
      </Dialog>



      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Slider {...settings}>
            {product.images && product.images.map((item) => (
              <div className={classes.categoryBox}>
                <img src={item.image} />
              </div>
            ))}
          </Slider>

          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <Button classes={{ root: classes.largeBtn }} color="secondary" variant="contained" disableElevation fullWidth size="large"
                  onClick={() => {
                    if (!isAuthenticated) {
                      history.push("/login");
                    } else {
                      const tempCartItem = { ...cartItem, qty: 1 };
                      handleQtyInc(tempCartItem);
                    }
                  }}
                >
                  <AddIcon /> Add to Cart</Button>
              </Grid>
              <Grid item sm={6}>
                <Button classes={{ root: classes.largeBtn }} color="primary" variant="contained" disableElevation fullWidth size="large"
                  onClick={() => {
                    const tempCartItem = { ...cartItem, qty: 1 };
                    handleQtyInc(tempCartItem);
                    history.push("/cart");
                  }}
                >
                  <ShoppingCartIcon fontSize="small" /> Buy Now</Button>
              </Grid>
            </Grid>
          </Box>

        </Grid>
        <Grid item md={6}>
          <Paper className={classes.paper}>
            <Typography variant='h4' className={classes.bigName}><b>{product.name}</b></Typography>
            <Typography variant='caption'>Selling Price : <b>₹{selectedVariant?.discountedPrice}</b> &nbsp; <del>₹{selectedVariant?.price}</del></Typography>

            <span className={classes.badge} color="textSecondary" gutterBottom>
              {selectedVariant?.discountPercentage}% OFF
            </span>

            <Grid className={classes.reviews} container spacing={1} direction="row">
              {/* <Grid item>
                <Rating rate={4.8} />
              </Grid> */}
              <Grid item>
                {/* <Typography variant='caption'>(245) Reviews</Typography> */}
              </Grid>
            </Grid>

            <Grid className={classes.reviews} container spacing={1} justify="space-between">
              <Grid item>
                <Box><Typography variant='h6'><b>Delivery</b></Typography></Box>
                <Box><Typography variant='subtitle1' color="textSecondary">Free</Typography></Box>
              </Grid>
              <Grid item>
                <Button color="primary" variant="outlined" onClick={() => setEnquiry(true)}>Enquiry Now</Button>
              </Grid>
            </Grid>


            <Grid className={classes.reviews} container spacing={1} justify="space-between">
              <Grid item>
                <ToggleButtonGroup
                  value={selectedVariant && selectedVariant.id}
                  exclusive
                  onChange={handleVariant}
                  aria-label="text variant"
                >
                  {product.variants && product.variants.map(variant =>
                    <ToggleButton value={variant.id} aria-label="left aligned" size="small"
                      classes={{ root: classes.toggleBtn, selected: classes.selectedBtn }}
                    >
                      {variant.displayWeight}
                    </ToggleButton>
                  )}
                  {/* <ToggleButton value="6 pcs" aria-label="centered" size="small"
                    classes={{ root: classes.toggleBtn, selected: classes.selectedBtn }}>
                    6 pcs
                  </ToggleButton>
                  <ToggleButton value="1 kg" aria-label="right aligned" size="small"
                    classes={{ root: classes.toggleBtn, selected: classes.selectedBtn }}>
                    1 kg
                  </ToggleButton> */}
                </ToggleButtonGroup>
              </Grid>
              <Grid item>
                <QtyController product={product} variant={selectedVariant} />
              </Grid>
            </Grid>

            <Box my={3}>

              {/* <TextField fullWidth size="small"
                label="Type your city (e.g Chennai, Pune)"
                id="outlined-start-adornment"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
                }}
                variant="outlined"
              /> */}

            </Box>

            {product.description?.length > 0 && <Box mt={2} mb={0.5}><Typography variant='h6'><b>Product Details</b></Typography></Box>}
            <Typography variant='subtitle1' color="textSecondary">
              {product.description}
            </Typography>

            {/* <TextField color="primary" id="filled-basic" label="Type your city (e.g Chennai, Pune)" fullWidth size="small" variant="filled" /> */}


          </Paper>
        </Grid>
      </Grid>

    </>
  );
}