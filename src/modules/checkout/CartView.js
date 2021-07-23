import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { Stepper, Step, StepLabel, StepContent, Button, Grid, Paper, Typography, Divider, AppBar, Tabs, Tab, Box } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { HeadingBar, QtyController } from '../component/index'
import { useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({

  cartOverview:{
    padding:12
  },
  cartDetailRow:{
    display:'flex',
    flexDirection:'row',
    margin:'6px 0'
  },
  dateLabel:{
    display:'block',
    fontSize:12
  },
  center:{
    textAlign:'center',
    '& .MuiTab-root':{
      minWidth:100
    },
    '& .MuiTab-wrapper':{
      width:'auto'
    }
  },
  content:{},
  editBtn:{},
  addressStyle: {
    border: '1px solid #ccc',
    '& $content':{
      padding: '15px',
      position:'relative',
      '& $badge':{
        right:10,
        top:10,
        left:'auto'
      },
      '& $editBtn': {
        marginTop:20,
        textAlign:'right'
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
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
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

function getSteps() {
  return [` Cart (${CartItem.length} items)`, 'Order Address', 'Delivery Time', 'Payment'];
}


export function CartItems() {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [addProduct, setAddProduct] = useState({});
  // const isFocused = useIsFocused();
  const settings = useSelector(state => state.app.settings);


  return (
    <>
      <Divider />
      {CartItem.map((items) => (
        <>
          <div className={classes.cartDesign}>
            <div className={classes.thumb}>
              {items.disPercent > 0 &&
                <span className={classes.badge} color="textSecondary" gutterBottom>
                  {items.disPercent}%
                </span>
              }
              <img src={items.image} />
            </div>
            <div style={{ flex: 1 }}>
              <Typography variant="h5"><b>{items.name}</b></Typography>
              <Typography variant='caption' color={'textPrimary'}>
                <strike style={{ color: theme.palette.primary.main, marginRight: 6 }}>₹{items.oldPrice}kg</strike>
                ₹{items.newPrice}/kg
              </Typography>
              <div className={classes.cartItemPriceDiv}>
                <div style={{ flex: 1 }}>
                  <Typography variant='h6'><b>₹{items.sellPrice}</b></Typography>
                </div>
                <QtyController />
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
  return (
    <Grid container spacing={3}>
      <Grid item lg={6}>
        <div className={classes.addressStyle}>
          <div className={classes.addressType}>
            <div className={classes.content}>
            <Typography><b>Home</b></Typography>
            <span className={classes.badge} color="textSecondary" gutterBottom>
              Default
            </span>
            <Typography variant="caption">
              Model Town Ludhiana, Punjab 140010, India
            </Typography>
            <div className={classes.editBtn}>
            <Button variant="outlined" color="primary">
              Edit
            </Button>
            </div>
            </div>
            <Button variant="contained" disableElevation color="inherit" fullWidth>
              Deliver Here
            </Button>
          </div>
        </div>
      </Grid>
      <Grid item lg={6}>
        <div className={classes.addressStyle}>
          <div className={classes.addressType}>
            <div className={classes.content}>
            <Typography><b>Home</b></Typography>
            {/* <span className={classes.badge} color="textSecondary" gutterBottom>
              Default
            </span> */}
            <Typography variant="caption">
              Model Town Ludhiana, Punjab 140010, India
            </Typography>
            <div className={classes.editBtn}>
            <Button variant="outlined" color="primary">
              Edit
            </Button>
            </div>
            </div>
            <Button variant="contained" disableElevation color="inherit" fullWidth>
              Deliver Here
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export function TimeSlot() {
  const [value, setValue] = React.useState(0);
  const [time, setTime] = React.useState('female');
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const timeSelect = (event) => {
    setTime(event.target.time);
  };

  return (
    <div>
      <div className={classes.center}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          // variant="scrollable"
          scrollButtons="auto"
          aria-label="simple tabs example"
          // aria-label="scrollable auto tabs example"
        >
          <Tab label={<div><b>MON</b><span className={classes.dateLabel}>7 Sep</span></div>} {...a11yProps(0)} />
          <Tab label={<div><b>TUE</b><span className={classes.dateLabel}>8 Sep</span></div>}  {...a11yProps(1)} />
          <Tab label={<div><b>WED</b><span className={classes.dateLabel}>9 Sep</span></div>}  {...a11yProps(2)} />
          <Tab label={<div><b>THU</b><span className={classes.dateLabel}>10 Sep</span></div>}  {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      </div>
      <TabPanel value={value} index={0}>

        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={timeSelect}>
          <FormControlLabel classes={{label:classes.small}} className={classes.filterItem} value="6AM - 10AM" control={<Radio color="primary" />} label="Top Rated" />
          <FormControlLabel classes={{label:classes.small}}  className={classes.filterItem} value="4PM - 6AM" control={<Radio color="primary" />} label="Nearest Me" />
          <FormControlLabel classes={{label:classes.small}}  className={classes.filterItem} value="6PM - 9PM" control={<Radio color="primary" />} label="Cost High to Low" />
          <FormControlLabel classes={{label:classes.small}}  className={classes.filterItem} value="0AM - 1PM" control={<Radio color="primary" />} label="Cost Low to High" />
        </RadioGroup>

      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </div>
  )
}

export function PaymentType() {
  return (
    <div>
      <Button>Online</Button>
      <Button>COD</Button>
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
  const steps = getSteps();


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
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
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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
          </Paper>
        )}

          </Grid>

          <Grid item lg={4}>
              <Paper>
                <div className={classes.cartOverview}>
                  <Typography><b>Bill Details</b></Typography>
                  <div className={classes.cartDetailRow}>
                    <div className={classes.content}>
                    <Typography color="textSecondary"><span style={{color:'#000'}}>Price</span> (2 item)</Typography>
                    
                    </div>
                    <Typography><b>₹3600</b></Typography>
                  </div>
                  <div className={classes.cartDetailRow}>
                    <div className={classes.content}>
                    <Typography color="textSecondary"><span style={{color:'#000'}}>Selling Price Total</span> (2 item)</Typography>
                    
                    </div>
                    <Typography><b>₹3600</b></Typography>
                  </div>
                  <div className={classes.cartDetailRow}>
                    <div className={classes.content}>
                    <Typography>Discount Total</Typography>
                    
                    </div>
                    <Typography><b>₹300</b></Typography>
                  </div>
                  <div className={classes.cartDetailRow}>
                    <div className={classes.content}>
                    <Typography color="textSecondary"><span style={{color:'#000'}}>Taxes</span></Typography>
                    
                    </div>
                    <Typography><b>₹3600</b></Typography>
                  </div>
                  <div className={classes.cartDetailRow}>
                    <div className={classes.content}>
                    <Typography color="textSecondary"><span style={{color:'#000'}}>Delivery Charges</span></Typography>
                    
                    </div>
                    <Typography><b>₹3600</b></Typography>
                  </div>
                  <Divider/>
                    <Typography variant="subtitle2" color={"textSecondary"}>Your Total Savings on this order ₹3600</Typography>
                  <Divider/>
                  <div className={classes.cartDetailRow}>
                    <div className={classes.content}>
                      <Typography variant="h5">To Pay</Typography>
                    </div>
                    <Typography variant="h5" color={'error'}>₹3600</Typography>
                  </div>
                  </div>
              </Paper>
          </Grid>
        </Grid>
       
      </div>
    </>
  );
}