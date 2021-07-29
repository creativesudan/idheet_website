import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, IconButton, Paper, Typography, Button, Card, CardContent, CardMedia, Grid, Fab, FormControl, MenuItem, Select } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { HeadingBar, QtyController } from '../component/index'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateItem } from '../../redux/actions/cart';
import { getCartItem } from '../../redux/lib/cart';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  sliderArrow: {
    width: 30, height: 30, borderRadius: 100, background: "#fff",
    boxShadow: '1px 1px 5px #ccc', position: 'absolute',
    top: 0, bottom: 0, margin: 'auto', zIndex: 1
  },
  categoryBox: {
    textAlign: 'center',
    // margin: theme.spacing(1, 0),
    // padding: theme.spacing(0, 1),
    '& img': {
      display: 'inline-block',
    }
  },
  paper: {
    overflow: 'hidden'
  },
  cardRoot: {
    paddingBottom: '16px!important'
  },
  media: {
    flex: 1,
    height: 170,
    maxWidth: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  },
  thumb_cover: {
    textAlign: 'center',
    marginBottom: 15,
  },
  textContent: {
    marginTop: 20, marginBottom: 10
  },
  fullWidth: {
    width: "100%",
    marginBottom: 10
  }
}))

function SampleNextArrow(props) {
  const classes = useStyles();
  const { className, style, onClick } = props;
  return (
    <div
      className={classes.sliderArrow}
      style={{ ...style, right: -5 }}
    >
      <IconButton size="small" color="primary" onClick={onClick} aria-label="upload picture" component="span">
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
}

function SamplePrevArrow(props) {
  const classes = useStyles();
  const { className, style, onClick } = props;
  return (
    <div
      className={classes.sliderArrow}
      style={{ ...style, left: -5 }}
    >
      <IconButton size="small" color="primary" onClick={onClick} aria-label="upload picture" component="span">
        <ChevronLeftIcon />
      </IconButton>
    </div>

  );
}

export default function RecommendedProducts({ title, products }) {
  const classes = useStyles();
  const cartItems = useSelector(state => state.cart.items);
  const cartLoading = useSelector(state => state.cart.cartLoading);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleQtyDec = (cartItem) => {
    dispatch(removeItem(cartItem));
  }

  const handleQtyInc = (cartItem) => {
    dispatch(updateItem(cartItems, cartItem));
  }

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const [selectedVariant, setSelectedVariant] = useState({});

  useEffect(() => {
    let result = {};
    products.map(p => {
      result[p.id] = p.defaultVariant;
    });
    setSelectedVariant(result);
  }, [products]);

  return (
    <>
      <HeadingBar
        title={title}
        button={products.length > 4 && <Button color="primary" variant="outlined" size="small">See more</Button>}
      />


      <Grid container spacing={2}>

        {products.map(item => {
          const cartItem = getCartItem(cartItems, item);
          return (
            <Grid item md={3} xs={12}>
              <Card>
                <CardContent classes={{ root: classes.cardRoot }}>

                  <Link to={"/product/" + item.id}>
                    <Slider {...settings} style={{ margin: -5 - 5 }}>
                      {item.images.map((item) => (
                        <div className={classes.categoryBox}>
                          <div style={{ padding: 8 }}>
                            <Paper elevation={0} classes={{ root: classes.paper }}>

                              <div className={classes.thumb_cover}>
                                <img src={item.image} className={classes.media} title={item.name} />
                              </div>

                            </Paper>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </Link>

                  <Link to={"/product/" + item.id}>
                    <div className={classes.textContent}>
                      <Typography variant="h6" color="primary">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.tagline}
                      </Typography>
                    </div>
                  </Link>

                  <FormControl className={classes.fullWidth}>
                    {/* <InputLabel id="demo-customized-select-label">Age</InputLabel> */}
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      value={selectedVariant[item.id]?.id.toString() || ""}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setSelectedVariant({ ...selectedVariant, [item.id]: item.variants?.find(v => v.id == parseInt(e.target.value)) });
                        // cartItem = getVariantCartItem(cartItems, item, e.target.value);

                      }}
                    // input={ }
                    >
                      {item.variants?.map(variant => <MenuItem value={variant.id.toString()}>{variant.displayWeight}</MenuItem>)}
                      {/* <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                  </FormControl>


                  <Grid container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >

                    <Grid item>
                      <Typography variant="h6" color="initial">
                        ₹{selectedVariant[item.id]?.discountedPrice}/{selectedVariant[item.id]?.displayWeight}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <QtyController product={item} variant={selectedVariant[item.id]} />
                    </Grid>

                  </Grid>

                </CardContent>
                {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
              </Card>

            </Grid>
          )
        })}
      </Grid>



    </>
  );
}