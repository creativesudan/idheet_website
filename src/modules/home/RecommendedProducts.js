import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container,IconButton,Paper,Typography,Button,Card,CardContent,CardMedia, Grid,Fab } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {HeadingBar, QtyController} from '../component/index'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';



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
  sliderArrow: {
    width:30, height:30,borderRadius:100, background: "#fff", 
    boxShadow:'1px 1px 5px #ccc', position:'absolute',
    top:0, bottom:0, margin:'auto', zIndex:1
  },
  categoryBox:{
    textAlign:'center',
    // margin: theme.spacing(1, 0),
    // padding: theme.spacing(0, 1),
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

export default function RecommendedProducts() {
  const classes = useStyles();
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
     <HeadingBar 
      title="Recommend for You" 
      button={<Button color="primary"  variant="outlined" size="small">26 more</Button>}
    />


<Grid container spacing={2}>

{Product.map(item => {
  return (
<Grid item md={4} xs={12}>
    <Card>
      <CardContent classes={{root:classes.cardRoot}}>

        <Slider {...settings} style={{margin:-5 -5}}>
          {Category.map((item) => (
            <div className={classes.categoryBox}>
              <div style={{padding:10}}>
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

    

    </>
  );
}