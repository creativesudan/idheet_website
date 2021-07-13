import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container,Breadcrumbs,Link,Typography,Box,Button,IconButton,Grid,Card,CardContent,Paper} from '@material-ui/core';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {HeadingBar,QtyController} from '../component/index'
import {Products} from './index'
import {Filter} from './index'
import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


const Product = [
  {id:1, name:'Fresh Orange', discPer:'10', price:'0.8', perunit:'kg'},
  {id:2, name:'chilli', discPer:'10', price:'0.8', perunit:'kg'},
  {id:3, name:'chilli', discPer:'10', price:'0.8', perunit:'kg'},
]
const Category = [
  {id:1, name:'Vegetables',icon:'https://www.zoovi.in/kisanhaat/img/promo1.jpg'},
  {id:2, name:'Fruits',icon:'https://www.zoovi.in/kisanhaat/img/promo2.jpg'},
  {id:3, name:'Meat',icon:'https://www.zoovi.in/kisanhaat/img/promo3.jpg'},
]

const useStyles = makeStyles((theme) => ({
  sectionGap:{
    margin: theme.spacing(6, 0)
  },
  BreadcrumbsContainer:{
    padding:'20px 0',
    background:'#e9ecef'
  },
  sliderArrow: {
    width:30, height:30,borderRadius:100, background: "#fff", 
    boxShadow:'1px 1px 5px #ccc', position:'absolute',
    top:0, bottom:0, margin:'auto', zIndex:1
  },
  categoryBox:{
    textAlign:'center',
    '& img':{
      width:'100%',
      display:'block',
    }
  },
  paper:{
    overflow:'hidden'
  },
  cardRoot:{
    paddingBottom: '16px!important'
  },
  textContent:{
    marginTop:20, marginBottom:10
  }

}))



function SampleNextArrow(props) {
  const classes = useStyles();
  const { className, style, onClick } = props;
  return (
    <div
      className={classes.sliderArrow}
      style={{ ...style, right:-5 }}
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
      style={{ ...style, left:-5  }}
    >
      <IconButton size="small" color="primary" onClick={onClick} aria-label="upload picture" component="span">
      <ChevronLeftIcon />
    </IconButton>
    </div>
    
  );
}


export default function Recommended() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  var settings = {
    dots: false,
    infinite: true,
    autoplay:true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  return (
    <>
    <div className={classes.BreadcrumbsContainer}>
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="primary" href="/">
            Home
          </Link>
          <Typography color="textPrimary">Recommended</Typography>
        </Breadcrumbs>
      </Container>
    </div>
    <Container>
      <div className={classes.sectionGap}>
          <Filter drawerState={open}/>
    
            <HeadingBar
              variant="h4"
              title="Recommended" 
              button={
                <>
                  <Box mx={1}>
                    <Button variant="outlined" size="small" onClick={()=> setOpen(!open)}>
                      <FilterListIcon fontSize="small"/>&nbsp;Filter
                    </Button>
                  </Box>
                  <Button variant="outlined" size="small"  onClick={()=> setOpen(!open)}>
                    <SortIcon fontSize="small"/>&nbsp;Sort
                  </Button>
                </>
              }
            />
          
          
<Grid container spacing={2}>

{Product.map(item => {
  return (
<Grid item md={4} xs={12}>
    <Card>
      <CardContent classes={{root:classes.cardRoot}}>

        <Slider {...settings}>
          {Category.map((item) => (
            <div className={classes.categoryBox}>
              <div>
                <Paper elevation={0} classes={{root:classes.paper}}>
                  <img src={item.icon}/>
                </Paper>
                </div>
            </div>
          ))}
        </Slider>  
        
        <div className={classes.textContent}>
          <Typography variant="h6" color="primary">
            {item.name}
          </Typography>
          <Typography  variant="body2" color="textSecondary">
            Orange Great Quality item from Jamaica.
          </Typography>
        </div>


        <Grid container
           direction="row"
           justify="space-between"
           alignItems="center"
           >
          
          <Grid item>
            <Typography variant="h6" color="initial">
              ₹{item.price}/{item.perunit}
            </Typography>
          </Grid>

          <Grid item>
            <QtyController/>
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


      </div>
    </Container>
    </>
  );
}
