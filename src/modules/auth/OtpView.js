import React, { useEffect, useState } from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Breadcrumbs, Link, Typography, Paper, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import CloseIcon from '@material-ui/icons/Close';

import { CustomBadge } from '../component/index'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PhoneIcon from '@material-ui/icons/Phone';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { verify } from '../../redux/actions/auth';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  sectionGap: {
    margin: theme.spacing(6, 0)
  },
  BreadcrumbsContainer: {
    padding: '20px 0',
    background: '#e9ecef'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.text.primry,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))



export default function OtpView() {
  const classes = useStyles();
  const mobile = useSelector(state => state.auth.mobile);
  const dispatch = useDispatch();
  const [otp, changeOtp] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (!mobile) history.push("/login");
  }, [mobile]);

  return (
    <>
      <div className={classes.BreadcrumbsContainer}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" href="/">
              Home
            </Link>
            <Typography color="textPrimary">OTP</Typography>
          </Breadcrumbs>
        </Container>
      </div>

      <Container component="main" maxWidth="xs">
        <div className={classes.sectionGap}>


          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ChatBubbleOutlineIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Verify Your Mobile
            </Typography>
            <Typography component="p" variant="p">
              Kisan Haat sent an OTP to your Mobile
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                autoFocus
                onChange={(e) => changeOtp(e.target.value)}
              />
              <Button
                type="button"
                fullWidth
                size={'large'}
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={otp.length != 6}
                onClick={() => dispatch(verify(mobile, otp)).then(() => history.push("/"))}
              >
                Submit
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
                </Grid>
                <Grid item>

                  <Link href="register" variant="body2">
                    Change Mobile
                  </Link>
                </Grid>
              </Grid>

            </form>
          </div>


        </div>
      </Container>
    </>
  );
}