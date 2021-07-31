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
}))

const compareUser = (user, updatedUser) => {
  // if(!user || !updatedUser) return true;
  // if(user.name !== updatedUser.name) return false;
  // if(user.mobile !== updatedUser.mobile) return false;
  // if(user.email !== updatedUser.email) return false;
  // if(user.business_name !== updatedUser.business_name) return false;
  // if(user.pan_no !== updatedUser.pan_no) return false;
  // if(user.gst_no !== updatedUser.gst_no) return false;

  return user == updatedUser;
}

export default function MyAccount() {
  const classes = useStyles();
  const user = useSelector(state => state.auth.user);
  const [updatedUser, setUpdatedUser] = useState(user);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (!user) fetchUser();
    if (user) setUpdatedUser(user);
  }, [user]);



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
            <Grid item md={4} sm={12} xs={12}>
              <LeftPanel user={user} />
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
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
                      value={updatedUser?.name}
                      onChange={e => setUpdatedUser({ ...updatedUser, name: e.target.value })}
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
                      value={updatedUser?.mobile}
                      onChange={e => setUpdatedUser({ ...updatedUser, mobile: e.target.value })}
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
                      value={updatedUser?.email}
                      onChange={e => setUpdatedUser({ ...updatedUser, email: e.target.value })}
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
                      value={updatedUser?.business_name}
                      onChange={e => setUpdatedUser({ ...updatedUser, business_name: e.target.value })}

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
                      value={updatedUser?.pan_no}
                      onChange={e => setUpdatedUser({ ...updatedUser, pan_no: e.target.value })}

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
                      value={updatedUser?.gst_no}
                      onChange={e => setUpdatedUser({ ...updatedUser, gst_no: e.target.value })}

                    />

                    <div style={{ marginTop: 10 }}>
                      <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.submit}
                        onClick={() => dispatch(updateUser(updatedUser))}
                        disabled={compareUser(user, updatedUser)}
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