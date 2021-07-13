import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography,Grid,Drawer,IconButton,Checkbox,FormGroup ,TextField} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Slider from '@material-ui/core/Slider';



const useStyles = makeStyles((theme) => ({

  Drawer:{
    width: 350,
  },
  slider: {
    padding:theme.spacing(2,3),
  },
  heading:{
    padding:theme.spacing(2,0,2,3)
  },
  subHeading:{
    padding:theme.spacing(2,3),
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    background:'#f8f9fa',
    borderBottom: '1px solid #dee2e6',
    borderTop: '1px solid #dee2e6',
    fontWeight:'bold',
    fontSize:14,
    color:'#212529',
    textTransform:'uppercase'
  },
  filterItem:{
    margin:theme.spacing(0,2),
    padding:theme.spacing(0.5,0),
    borderBottom: '1px solid #dee2e6'
    
  },
  small:{
    fontSize:12
  },
  inputGroup:{
    marginTop:10
  }
  
}));

function valuetext(ranger) {
  return ranger;
}


export default function Filter(props) {
  const classes = useStyles();
  const {drawerState} = props;
  const [open, setOpen] = React.useState(drawerState);

  

  const [value, setValue] = React.useState('female');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [ranger, setRanger] = React.useState([20, 40]);

  const handleSlider = (event, newValue) => {
    setRanger(newValue);
  };

  return (
    <>
    <Drawer
    //  variant="persistent"
    classes={{paper:classes.Drawer}}
     anchor="right"
     open={drawerState}
     onClose={()=> setOpen(!open)}
    > 
      <div className={classes.heading}>
        <Grid container justify="space-between" direction="row" alignItems="center">
          <Grid item>
            <Typography variant={'h5'}>Filter</Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="show 17 new notifications" color="inherit" onClick={()=> setOpen(!open)}>
                <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>

        <FormLabel component="legend" color="default" className={classes.subHeading}>Sort By</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
          <FormControlLabel classes={{label:classes.small}} className={classes.filterItem} value="Top Rated" control={<Radio color="primary" />} label="Top Rated" />
          <FormControlLabel classes={{label:classes.small}}  className={classes.filterItem} value="Nearest Me" control={<Radio color="primary" />} label="Nearest Me" />
          <FormControlLabel classes={{label:classes.small}}  className={classes.filterItem} value="High to Low" control={<Radio color="primary" />} label="Cost High to Low" />
          <FormControlLabel classes={{label:classes.small}}  className={classes.filterItem} value="Low to High" control={<Radio color="primary" />} label="Cost Low to High" />
          <FormControlLabel classes={{label:classes.small}}  className={classes.filterItem} value="Most Popular" control={<Radio color="primary" />} label="Most Popular" />
        </RadioGroup>

        <FormLabel component="legend" className={classes.subHeading}>Filter</FormLabel>
        <FormControlLabel classes={{label:classes.small}}  className={classes.filterItem} value="start" control={<Checkbox color="primary" />} label="Open Now"/>
        <FormControlLabel classes={{label:classes.small}}  className={classes.filterItem} value="start" control={<Checkbox color="primary" />} label="Credit Cards"/>
        <FormControlLabel classes={{label:classes.small}}  className={classes.filterItem} value="start" control={<Checkbox color="primary" />} label="Alcohol Served"/>
         
        <FormLabel component="legend" className={classes.subHeading}>ADDITIONAL FILTERS</FormLabel>
        <div className={classes.slider}>
          <Slider
            value={ranger}
            onChange={handleSlider}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            min={10}
            max={50}
            step={1}
          />
        
          <div className={classes.inputGroup}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField id="outlined-basic"type="number" label="Min" variant="outlined" size="small"
                value={ranger[0]}/>
              </Grid>
              <Grid item xs={6}>
                <TextField id="outlined-basic"type="number" label="Min" variant="outlined" size="small"
                value={ranger[1]}/>
              </Grid>
            </Grid>
          </div>
        </div>

    </Drawer>

    </>
  );
}