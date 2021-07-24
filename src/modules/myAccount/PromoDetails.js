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
  Avatar:{
    display:'block',
    '& img':{
      objectFit:'cover',
      objectPositon:'center',
      width:'100%',
      height:250,
      borderRadius:10
    }
  },
}))



export default function PromoDetailView() {
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
                  <div className={classes.detailView}>
                    <div className={classes.frame}>
                      
                    <span className={classes.Avatar}>
                      <img src="https://media.self.com/photos/5f189b76c58e27c99fbef9e3/1:1/w_768,c_limit/blackberry-vanilla-french-toast.jpg"/>
                    </span>
                    <br/>
                    <br/>

                    <Grid container justify="space-between" alignItems="center">
                        
                        <Grid item>
                          <Typography color="primary" variant="h5">
                            <b>Get 25% off buying Banana</b>
                          </Typography>
                          <Typography variant="caption" color="textSecondary">Available until 24 July 2020</Typography>
                        </Grid>
                        <Grid>
                          <Button variant="contained" color="primary" size="large">Copy</Button>
                        </Grid>
                    </Grid>
                    <br/>
                    <Typography variant="h6">
                      <b>Terms $ Conditions</b>
                    </Typography>

                    <Typography variant="caption">
                    Easypromos only uses detials of its users to facilitate the successful operation of the promotions.
Easypromos will never utilize detials of registered users for any other reason. <br/><br/>
                    Easypromos only uses detials of its users to facilitate the successful operation of the promotions.
Easypromos will never utilize detials of registered users for any other reason. <br/><br/>
                    Easypromos only uses detials of its users to facilitate the successful operation of the promotions.
Easypromos will never utilize detials of registered users for any other reason. <br/>
                    </Typography>
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