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
    margin:'20px 0',
    position:'relative'
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
  date:{
    position:'absolute',
    right:16,
    top:18,
  },
  spacing:{
    margin:'15px 0'
  }
}))



export default function EnquiryDetailView() {
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
                  <div className={classes.spacing}>
                    <Grid container justify="space-between">
                      <Grid item>
                        <Typography variant="h5"><b>Product Name</b></Typography>
                        <Typography variant="subtitle2"><b>Quantity Required:</b> <span>52</span></Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="caption">27-07-2021</Typography>
                      </Grid>
                    </Grid>
                  </div>

                  <hr style={{border:'1px solid #ddd'}}/>
               
                  <div className={classes.spacing}>
                        <Typography variant="subtitle2"><b>Your Name:</b> <span>Vinay</span></Typography>
                        <Typography variant="caption">7838414681</Typography>
                  </div>

                  <div className={classes.spacing}>
                  <Typography variant="subtitle2"><b>Message:</b></Typography>
                  <Typography variant="body2" color="textSecondary">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
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