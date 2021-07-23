import React from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Container,Breadcrumbs,Link,Typography,Paper,Grid,Divider, TextField} from '@material-ui/core';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Avatar from '@material-ui/core/Avatar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LeftPanel from './LeftPanel';


const useStyles = makeStyles((theme) => ({
  sectionGap:{
    margin: theme.spacing(6, 0)
  },
  BreadcrumbsContainer:{
    padding:'20px 0',
    background:'#e9ecef'
  },
  frame:{
    padding: 20
  },
}))



export default function MyAccount() {
  const classes = useStyles();



  return (
    <>
    <div className={classes.BreadcrumbsContainer}>
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="primary" href="/">
            Home
          </Link>
          <Link color="primary" href="/">
            My Orders
          </Link>
          <Typography color="textPrimary">Order Detail</Typography>
        </Breadcrumbs>
      </Container>
    </div>
    <Container>
      <div className={classes.sectionGap}>
        <Grid container spacing={3}>
          <Grid item lg={4}>
            <LeftPanel/>
          </Grid>  
          <Grid item lg={8}>
            <Paper>
              <div className={classes.frame}>
                <Typography>My account</Typography>
                <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  id="fname"
                  label="Full Name"
                  name="fname"
                  autoComplete="text"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  id="mobile"
                  label="Mobile"
                  name="mobile"
                  autoComplete="phone"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  id="Business_Name"
                  label="Business Name"
                  name="business_name"
                  autoComplete="text"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  id="pan_no"
                  label="PAN No."
                  name="pan_no"
                  autoComplete="text"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  size="small"
                  fullWidth
                  id="gst_no"
                  label="GST No."
                  name="gst_no"
                  autoComplete="text"
                  autoFocus
                />
                
                <div style={{marginTop:10}}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.submit}
                >
                  Save Changes
                </Button>
                </div>
              </form>
              </div>
            </Paper>
          </Grid>  
        </Grid>  

      </div>
    </Container>
    </>
  );
}