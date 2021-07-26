import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Grid, Box, Paper, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import { HeadingBar, QtyController, Rating } from '../component/index'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { getCartItem } from '../../redux/lib/cart';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateItem } from '../../redux/actions/cart';
import { useHistory } from 'react-router-dom';


const sliderImage = [
  { id: 1, name: 'Vegetables', icon: 'https://www.zoovi.in/kisanhaat/img/recommend/r1.jpg' },
  { id: 2, name: 'Fruits', icon: 'https://www.zoovi.in/kisanhaat/img/recommend/r2.jpg' },
  { id: 3, name: 'Meat', icon: 'https://www.zoovi.in/kisanhaat/img/recommend/r3.jpg' },
]

const useStyles = makeStyles((theme) => ({
  categoryBox: {
    textAlign: 'center',
    '& img': {
      width: '100%',
      display: 'block',
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
    borderColor: '#ff6000',
    color: '#ff6000',
    '&$selectedBtn': {
      background: '#ff6000 !important',
      color: '#fff'
    }
  },
  selectedBtn: {
    background: '#ff6000',
  }
}))


export default function DetailView({ product }) {
  const classes = useStyles();
  useEffect(() => {
    setSelectedVariant(product.defaultVariant);
  }, [product]);

  const cartItems = useSelector(state => state.cart.items);
  const cartLoading = useSelector(state => state.cart.cartLoading);
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
    console.log(newVariant);
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


  return (
    <>

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
                    const tempCartItem = { ...cartItem, qty: 1 };
                    handleQtyInc(tempCartItem);
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
        <Grid item sm={6}>
          <Paper className={classes.paper}>
            <Typography variant='h2' className={classes.bigName}>{product.name}</Typography>
            <Typography variant='p'>Selling Price : <b>₹{product.discountedPrice}</b></Typography>
            <span className={classes.badge} color="textSecondary" gutterBottom>
              {product.discountPercentage}% OFF
            </span>

            <Grid className={classes.reviews} container spacing={1} direction="row">
              <Grid item>
                <Rating rate={4.8} />
              </Grid>
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
                <Box><Typography variant='h6' align="right"><b>Available in:</b></Typography></Box>
                <Box><Typography variant='subtitle1' align="right" color="textSecondary">1 kg, 2 kg, 5 kg</Typography></Box>
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
                <QtyController qty={cartItem.qty} cartItem={cartItem} handleQtyDec={handleQtyDec} handleQtyInc={handleQtyInc} disabled={cartLoading} />
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

            <Box mt={2} mb={0.5}><Typography variant='h6'><b>Product Details</b></Typography></Box>
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