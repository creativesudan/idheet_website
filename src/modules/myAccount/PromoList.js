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
import { fetchCoupons } from '../../redux/actions/cart';
import { useHistory } from 'react-router-dom';


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
  list: {
    background: '#70c584',
    padding: '16px',
    borderRadius: 4,
    margin: '20px 0'
  },
  listDetails: {
    marginBottom: 15
  },
  Avatar: {
    display: 'inline-block',
    '& img': {
      objectFit: 'cover',
      objectPositon: 'center',
      width: 100,
      height: 100,
      borderRadius: 4
    }
  },
  textWhite: {
    color: '#fff'
  }
}))



export default function PromoListView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.auth.user);
  const list = useSelector(state => state.cart.coupons);

  useEffect(() => {
    if (!list) dispatch(fetchCoupons());
  }, []);


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
                  <Typography variant="h4"><b>Avaiable Promos</b></Typography>

                  {list?.map(item => (
                    <div className={classes.list}>
                      <Grid container justify="space-between">
                        <Grid item>
                          <div className={classes.listDetails}>
                            <Typography variant="h5" className={classes.textWhite}>{item.title}</Typography>
                            <Typography variant="caption" className={classes.textWhite}>{item.description}</Typography>
                          </div>
                          <Button variant="contained" color="secondary"
                            onClick={() => history.push("/promo/" + item.coupon_id)}
                          >Check Now</Button>
                        </Grid>
                        <Grid item>
                          <span className={classes.Avatar}>
                            <img src={item.image} />
                          </span>
                        </Grid>
                      </Grid>
                    </div>))}



                </div>
              </Paper>
            </Grid>
          </Grid>

        </div>
      </Container>
    </>
  );
}