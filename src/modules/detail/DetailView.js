import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography,Button,Grid,Box,Paper,TextField,FormControl,InputLabel,OutlinedInput,InputAdornment } from '@material-ui/core';
import {HeadingBar, QtyController, Rating} from '../component/index'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { ToggleButton,ToggleButtonGroup } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';


const sliderImage = [
  {id:1, name:'Vegetables',icon:'https://www.zoovi.in/kisanhaat/img/recommend/r1.jpg'},
  {id:2, name:'Fruits',icon:'https://www.zoovi.in/kisanhaat/img/recommend/r2.jpg'},
  {id:3, name:'Meat',icon:'https://www.zoovi.in/kisanhaat/img/recommend/r3.jpg'},
]

const useStyles = makeStyles((theme) => ({
  categoryBox:{
    textAlign:'center',
    '& img':{
      width:'100%',
      display:'block',
    }
  },
  largeBtn:{
    height:theme.spacing(7)
  },  
  badge: {
    fontSize: 12,
    color: '#ff6000',
    backgroundColor: '#ffe7d9',
    padding: theme.spacing(0.5, 1.2),
    borderRadius:4,
    display:'inline-block',
    fontWeight:600, marginLeft:10
  },
  bigName:{
    marginBottom: theme.spacing(1),
  },
  paper:{
    padding:theme.spacing(3),
  },
  reviews:{
    marginTop:theme.spacing(0.8)
  },
  toggleContainer: {
    margin: theme.spacing(2, 0),
  },
  toggleBtn:{
    borderRadius:theme.spacing(4),
    padding:theme.spacing(0.7, 2),
    borderColor:'#ff6000',
    color:'#ff6000',
    '&$selectedBtn':{
      background:'#ff6000 !important',
      color:'#fff'
    }
  },
  selectedBtn:{
    background:'#ff6000',
  }
}))


export default function DetailView() {
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

  const [alignment, setAlignment] = React.useState('4 pcs');
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
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


  return (
    <>

      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Slider {...settings}>
            {sliderImage.map((item) => (
              <div className={classes.categoryBox}>
                  <img src={item.icon}/>
              </div>
            ))}
          </Slider>
          
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <Button classes={{root:classes.largeBtn}} color="secondary"  variant="contained" disableElevation fullWidth size="large">
                  <AddIcon/> Add to Cart</Button>
              </Grid>
              <Grid item sm={6}>
                <Button classes={{root:classes.largeBtn}} color="primary"  variant="contained" disableElevation fullWidth size="large">
                  <ShoppingCartIcon fontSize="small"/> Buy Now</Button>
              </Grid>
            </Grid>
          </Box>
          
        </Grid>
        <Grid item sm={6}>
            <Paper className={classes.paper}>
              <Typography variant='h2' className={classes.bigName}>Valencia Orange - Imported</Typography>
              <Typography variant='p'>Product MRP : <b>₹263.00</b></Typography>
              <span className={classes.badge} color="textSecondary" gutterBottom>
                50% OFF
              </span>

              <Grid className={classes.reviews} container spacing={1} direction="row">
                <Grid item>
                    <Rating rate={4.8}/>
                </Grid>
                <Grid  item>
                  <Typography variant='caption'>(245) Reviews</Typography>
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
                      value={alignment}
                      exclusive
                      onChange={handleAlignment}
                      aria-label="text alignment"
                    >
                      <ToggleButton value="4 pcs" aria-label="left aligned" size="small" 
                        classes={{root:classes.toggleBtn, selected:classes.selectedBtn}}
                      >
                        4 pcs
                      </ToggleButton>
                      <ToggleButton value="6 pcs" aria-label="centered"size="small" 
                        classes={{root:classes.toggleBtn, selected:classes.selectedBtn}}>
                        6 pcs
                      </ToggleButton>
                      <ToggleButton value="1 kg" aria-label="right aligned"size="small"
                        classes={{root:classes.toggleBtn, selected:classes.selectedBtn}}>
                        1 kg
                      </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item>
                  <QtyController/>
                </Grid>
              </Grid>

              <Box my={3}>

                  <TextField fullWidth size="small"
                    label="Type your city (e.g Chennai, Pune)"
                    id="outlined-start-adornment"
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small"/></InputAdornment>,
                    }}
                    variant="outlined"
                  />

              </Box>
              
              <Box mt={2} mb={0.5}><Typography variant='h6'><b>Product Details</b></Typography></Box>
              <Typography variant='subtitle1' color="textSecondary">
              High quality Fresh Orange fruit exporters from South Korea for sale. All citrus trees belong to the single genus Citrus and remain almost entirely interfertile. This includes grapefruits, lemons, limes, oranges, and various other types and hybrids. The fruit of any citrus tree is considered a hesperidium, a kind of modified berry; it is covered by a rind wall.
              </Typography>
        
              {/* <TextField color="primary" id="filled-basic" label="Type your city (e.g Chennai, Pune)" fullWidth size="small" variant="filled" /> */}
              
              
            </Paper>
        </Grid>
      </Grid>
    
    </>
  );
}