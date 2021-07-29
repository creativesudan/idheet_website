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
import { Link, useParams } from 'react-router-dom';
import { fetchEnquiryList } from '../../redux/actions/app';


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
  },
  spacing: {
    margin: '15px 0'
  }
}))



export default function EnquiryDetailView() {
  const classes = useStyles();
  const user = useSelector(state => state.auth.user);
  const { enquiry_id } = useParams();
  const dispatch = useDispatch();
  const enquiryList = useSelector(state => state.app.enquiryList);

  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    setEnquiry(enquiryList?.find(e => e.id == enquiry_id));
  }, [enquiry_id, enquiryList]);

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
            <Link color="primary" to="/enquiry">
              <Typography color="primary">Enquiries</Typography>
            </Link>
            <Typography color="textPrimary">Enquiry Details</Typography>
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
                        <Typography variant="h5"><b>{enquiry?.product?.name}</b></Typography>
                        <Typography variant="subtitle2"><b>Quantity Required:</b> <span>{enquiry?.qty}</span></Typography>
                      </Grid>
                      <Grid item>
                        {/* <Typography variant="caption">27-07-2021</Typography> */}
                      </Grid>
                    </Grid>
                  </div>

                  <hr style={{ border: '1px solid #ddd' }} />

                  <div className={classes.spacing}>
                    <Typography variant="subtitle2"><b>Your Name:</b> <span>{enquiry?.name}</span></Typography>
                    <Typography variant="caption">{enquiry?.mobile}</Typography>
                  </div>

                  <div className={classes.spacing}>
                    <Typography variant="subtitle2"><b>Message:</b></Typography>
                    <Typography variant="body2" color="textSecondary">{enquiry?.message}</Typography>
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