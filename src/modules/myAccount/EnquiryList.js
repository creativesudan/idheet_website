import React, { useEffect, useState } from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Breadcrumbs, Typography, Paper, Grid, Divider, TextField } from '@material-ui/core';

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
import { fetchEnquiryList } from '../../redux/actions/app';
import { Link, useHistory } from 'react-router-dom';


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
    border: '1px solid #ccc',
    padding: '16px',
    borderRadius: 4,
    margin: '20px 0',
    position: 'relative'
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
  date: {
    position: 'absolute',
    right: 16,
    top: 18,
  }
}))



export default function EnquiryListView() {
  const classes = useStyles();
  const user = useSelector(state => state.auth.user);
  const enquiryList = useSelector(state => state.app.enquiryList);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchEnquiryList());
  }, []);



  return (
    <>
      <div className={classes.BreadcrumbsContainer}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" to="/">
              <Typography color="primary">Home</Typography>
            </Link>
            <Typography color="textPrimary">Enquiries</Typography>
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
                  <Typography variant="h4" gutterBottom><b>Enquiries</b></Typography>

                  {enquiryList?.length > 0 ? enquiryList?.map(item => <div className={classes.list}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <span className={classes.Avatar}>
                          <img src={item.product?.images[0]?.image} />
                        </span>
                      </Grid>
                      <Grid item>
                        <div className={classes.listDetails}>
                          <Typography variant="h5" className={classes.textWhite}>{item.product?.name}</Typography>
                          <Typography variant="caption" className={classes.textWhite}>QTY: <b>{item.qty}</b></Typography>

                          {/* <Typography variant="caption" className={classes.date}>26-07-2021</Typography> */}
                        </div>
                        <Button variant="contained" color="secondary" onClick={() => history.push("/enquiry/" + item.id)}>View details</Button>
                      </Grid>

                    </Grid>
                  </div>)

                    :
                    <Typography variant="subtitle2" color="textSecondary">No Enquiry Found</Typography>
                  }


                </div>
              </Paper>
            </Grid>
          </Grid>

        </div>
      </Container>
    </>
  );
}