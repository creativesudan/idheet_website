import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography, Button, IconButton, Card, CardContent, CardActions, CardMedia, Grid, Fab, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { HeadingBar, QtyController } from '../component/index'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { getCartItem, getVariantCartItem } from '../../redux/lib/cart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, removeItem, updateItem } from '../../redux/actions/cart';
import { useHistory } from 'react-router-dom';

import ProductVariant from '../common/ProductVariant'





// const Product = [
//   { id: 1, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v1.jpg" },
//   { id: 2, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v2.jpg" },
//   { id: 3, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v3.jpg" },
//   { id: 4, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v4.jpg" },
//   { id: 5, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v5.jpg" },
//   { id: 6, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v1.jpg" },
//   { id: 7, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v2.jpg" },
//   { id: 8, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v3.jpg" },
// ]

const useStyles = makeStyles((theme) => ({
  cardSpace: {
    padding: 8
  },
  sliderArrow: {
    width: 30, height: 30, borderRadius: 100, background: "#fff",
    boxShadow: '1px 1px 5px #ccc', position: 'absolute',
    top: 0, bottom: 0, margin: 'auto', zIndex: 1
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  badge: {
    fontSize: 12,
    color: '#ff6000',
    backgroundColor: '#ffe7d9',
    padding: theme.spacing(0.5, 1.2),
    borderRadius: 4,
    display: 'inline-block',
    fontWeight: 600
  },
  pos: {
    marginBottom: 0, flex: 1
  },
  media: {
    display: 'inline-block',
    flex: 1,
    height: 170,
    maxWidth: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  },
  thumb_cover: {
    marginBottom: 15,
    textAlign: 'center',
    '& img': {
      display: 'inline-block'
    }
  },
  priceBar: {
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    paddingBottom: `${theme.spacing(2)}px !important`,
  },
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
  },
  fullWidth: {
    width: "100%",
    marginBottom: 10
  }
}));



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

export default function HotProducts({ title, products }) {
  const classes = useStyles();

  const [selectedVariant, setSelectedVariant] = useState({});

  useEffect(() => {
    let result = {};
    products.map(p => {
      result[p.id] = p.defaultVariant;
    });
    setSelectedVariant(result);
  }, [products]);

  // useEffect(() => {
  //   console.log("test", selectedVariant);
  // }, [selectedVariant]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const getMenuItem = (variant) => {
    return <MenuItem value={variant.id.toString()}>{variant.displayWeight}</MenuItem>
  }


  return (
    <>
      {/* <ProductVariant /> */}


      <HeadingBar
        title={title}
      // button={products.length > 4 && <Button color="primary" variant="outlined" size="small">See More</Button>}
      />


      <Slider {...settings} style={{ margin: -8, }}>
        {products && products.map(item => {

          return (
            <div className={classes.cardDiv}>
              <div className={classes.cardSpace}>
                <Card className={classes.root} >
                  <CardContent classes={{ root: classes.card }}>
                    <span className={classes.badge} color="textSecondary" gutterBottom>
                      {selectedVariant[item.id]?.discountPercentage}%
                    </span>
                    <Link to={"/product/" + item.id}>
                      <div className={classes.thumb_cover}>
                        <img src={item.image} className={classes.media} title={item.name} />
                      </div>
                    </Link>

                    <Link to={"/product/" + item.id}>
                      <Typography variant="h6" gutterBottom noWrap="true" color={'textPrimary'}>
                        {item.name}
                      </Typography>
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
                        {item.variants?.map(variant => getMenuItem(variant))}
                        {/* <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                      </Select>
                    </FormControl>

                    <Grid container container justify="space-between" direction="row" alignItems="center">

                      <Grid item>
                        <Typography variant="h6" color="primary">
                          ₹{selectedVariant[item.id]?.discountedPrice}/{selectedVariant[item.id]?.displayWeight}
                        </Typography>
                      </Grid>


                      <Grid item>
                        <QtyController product={item} variant={selectedVariant[item.id]} />
                      </Grid>
                    </Grid>

                  </CardContent>

                </Card>
              </div>
            </div>
          )
        })}
      </Slider>

    </>
  );
}