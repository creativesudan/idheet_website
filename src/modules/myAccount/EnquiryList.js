import React, { useEffect, useState } from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Breadcrumbs, Link, Typography, Paper, Grid, Divider, TextField } from '@material-ui/core';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Avatar from '@material-ui/core/Avatar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LeftPanel from './LeftPanel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../../redux/actions/auth';


const useStyles = makeStyles((theme) => ({
  sectionGap: {
    margin: theme.spacing(6, 0)
  },
  BreadcrumbsContainer: {
    padding: '20px 0',
    background: '#e9ecef'
  },
  frame: {
    padding: 20
  },
  list:{
    border:'1px solid #ccc',
    padding:'16px',
    borderRadius:4,
    margin:'20px 0'
  },
  listDetails:{
    marginBottom:15
  },
  Avatar:{
    display:'inline-block',
    '& img':{
      objectFit:'cover',
      objectPositon:'center',
      width:100,
      height:100,
      borderRadius:4
    }
  },
}))



export default function EnquiryListView() {
  const classes = useStyles();
  const user = useSelector(state => state.auth.user);



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
              <LeftPanel user={user} />
            </Grid>
            <Grid item lg={8}>
              <Paper>
                <div className={classes.frame}>
                  <Typography variant="h4"><b>Enquiries</b></Typography>
                  
                  <div className={classes.list}>
                    <Grid container spacing={2}>
                        <Grid item>
                        <span className={classes.Avatar}>
                            <img src="https://media.self.com/photos/5f189b76c58e27c99fbef9e3/1:1/w_768,c_limit/blackberry-vanilla-french-toast.jpg"/>
                          </span>
                        </Grid>
                        <Grid item>
                          <div className={classes.listDetails}>
                          <Typography variant="h5" className={classes.textWhite}>Product Name</Typography>
                          <Typography variant="caption" className={classes.textWhite}>QTY: <b>5</b></Typography>
                          </div>
                          
                          <Button variant="contained" color="secondary">Check Now</Button>
                        </Grid>
                        
                    </Grid>
                  </div>
                  
                  <div className={classes.list}>
                    <Grid container justify="space-between">
                        <Grid item>
                          <div className={classes.listDetails}>
                          <Typography variant="h5" className={classes.textWhite}>Grocery</Typography>
                          <Typography variant="caption" className={classes.textWhite}>BANANA'S 25% OFF</Typography>
                          </div>
                          <Button variant="contained" color="secondary">Check Now</Button>
                        </Grid>
                        <Grid item>
                          <span className={classes.Avatar}>
                            <img src="https://media.self.com/photos/5f189b76c58e27c99fbef9e3/1:1/w_768,c_limit/blackberry-vanilla-french-toast.jpg"/>
                          </span>
                        </Grid>
                    </Grid>
                  </div>
                  
                  <div className={classes.list}>
                    <Grid container justify="space-between">
                        <Grid item>
                          <div className={classes.listDetails}>
                          <Typography variant="h5" className={classes.textWhite}>Grocery</Typography>
                          <Typography variant="caption" className={classes.textWhite}>BANANA'S 25% OFF</Typography>
                          </div>
                          <Button variant="contained" color="secondary">Check Now</Button>
                        </Grid>
                        <Grid item>
                          <span className={classes.Avatar}>
                            <img src="https://media.self.com/photos/5f189b76c58e27c99fbef9e3/1:1/w_768,c_limit/blackberry-vanilla-french-toast.jpg"/>
                          </span>
                        </Grid>
                    </Grid>
                  </div>

                </div>
              </Paper>
            </Grid>
          </Grid>

        </div>
      </Container>
    </>
  );
}