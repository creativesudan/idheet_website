import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography, Button, IconButton, Card, CardContent, CardActions, CardMedia, Grid, Fab } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { HeadingBar, QtyController } from '../component/index'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { getCartItem } from '../../redux/lib/cart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, removeItem, updateItem } from '../../redux/actions/cart';
import { useHistory } from 'react-router-dom';



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
  cardDiv: {
    // padding:10
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
    flex: 1,
    height: 170,
    maxWidth: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  },
  thumb_cover: {
    textAlign: 'center'
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
  const cartItems = useSelector(state => state.cart.items);
  const cartLoading = useSelector(state => state.cart.cartLoading);
  const dispatch = useDispatch();
  const history = useHistory();

  // useEffect(() => {
  //   if (!cartItems || cartItems.length == 0) fetchCartItems();
  // }, [cartItems]);

  const handleQtyDec = (cartItem) => {
    dispatch(removeItem(cartItem));
  }

  const handleQtyInc = (cartItem) => {
    dispatch(updateItem(cartItems, cartItem));
  }

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


  return (
    <>
      <HeadingBar
        title={title}
        button={products.length > 4 && <Button color="primary" variant="outlined" size="small">See More</Button>}
      />


      <Slider {...settings} style={{ margin: -10, }}>
        {products && products.map(item => {
          const cartItem = getCartItem(cartItems, item);
          return (
            <div className={classes.cardDiv}>
              <Card className={classes.root} >
                <CardContent classes={{ root: classes.card }}>
                  <span className={classes.badge} color="textSecondary" gutterBottom>
                    {item.discountPercentage}%
                  </span>
                  {/* <CardMedia
                    className={classes.media}
                    image={item.image}
                    title={item.name}
                    onClick={() => history.push("/product/" + item.id)}
                  /> */}
                  <div className={classes.thumb_cover}>
                    <img src={item.image} className={classes.media} title={item.name} onClick={() => history.push("/product/" + item.id)} />
                  </div>
                  <Typography variant="h6" gutterBottom noWrap="true" onClick={() => history.push("/product/" + item.id)}>
                    {item.name}
                  </Typography>

                  <Grid container container justify="space-between" direction="row" alignItems="center">

                    <Grid item>
                      <Typography variant="h6" color="primary">
                        ₹{item.discountedPrice}/{item.displayWeight}
                      </Typography>
                    </Grid>


                    <Grid item>
                      <QtyController qty={cartItem.qty} cartItem={cartItem} handleQtyDec={handleQtyDec} handleQtyInc={handleQtyInc} disabled={cartLoading} />
                    </Grid>
                  </Grid>

                </CardContent>

              </Card>
            </div>
          )
        })}
      </Slider>

    </>
  );
}