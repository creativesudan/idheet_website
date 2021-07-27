import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, IconButton, Paper, Typography, Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { HeadingBar } from '../component/index'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, fetchCategories } from '../../redux/actions/home';
import { useHistory } from 'react-router-dom';

const Category = [
  { id: 1, name: 'Vegetables', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/1.svg' },
  { id: 2, name: 'Fruits', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/2.svg' },
  { id: 3, name: 'Meat', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/3.svg' },
  { id: 4, name: 'Seafood', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/4.svg' },
  { id: 5, name: 'Milk & Egg', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/5.svg' },
  { id: 6, name: 'Bread', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/6.svg' },
  { id: 7, name: 'Frozen', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/7.svg' },
  { id: 8, name: 'Organic', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/8.svg' },
  { id: 9, name: 'Fruits', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/1.svg' },
  { id: 10, name: 'Meat', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/2.svg' },
  { id: 11, name: 'Seafood', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/3.svg' },
  { id: 12, name: 'Milk & Egg', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/4.svg' },
  { id: 13, name: 'Bread', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/5.svg' },
  { id: 14, name: 'Vegetables', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/6.svg' },
  { id: 15, name: 'Frozen', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/7.svg' },
  { id: 16, name: 'Organic', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/8.svg' },
]

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
      height: 70,
      display: 'inline-block',
      maxWidth:'100%',
      objectFit:'cover',
      objectPosition:'center'
    }
  },
  paper: {
    padding: theme.spacing(2, 1),
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

export default function CategorySlider() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  const brands = useSelector(state => state.home.brands);
  const classes = useStyles();
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
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
        title="Shop By Brands"
        button={<Button color="primary" variant="outlined" size="small"
          onClick={() => history.push("/brands")}
        >See more</Button>}
      />
      <Slider {...settings} style={{ margin: -5, }}>
        {brands?.map(item => (
          <div className={classes.categoryBox}>
            <div style={{ padding: 10 }}>
              <Paper elevation={1} classes={{ root: classes.paper }} onClick={() => history.push("/brands/" + item.brand_id)}>
                <img src={item.image} />
                <Typography variant="caption" display="block" >{item.brand_name}</Typography>
              </Paper>
            </div>
          </div>
        ))}
      </Slider>

    </>
  );
}