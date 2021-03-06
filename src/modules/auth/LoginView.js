import React from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Container, Breadcrumbs, Typography, Paper, Grid } from '@material-ui/core';
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
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useDispatch, useSelector } from 'react-redux';
import { login, updateField } from '../../redux/actions/auth';
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



export default function LoginView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // const [value, setValue] = React.useState(0);
  const mobile = useSelector(state => state.auth.mobile);
  // const handleChange = (event) => {
  //   console.log(event.target.value);
  //   setValue(event.target.value);
  // };
  return (
    <>
      <div className={classes.BreadcrumbsContainer}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
          <Link color="primary" to="/">
            <Typography color="primary">Home</Typography>
          </Link>
            <Typography color="textPrimary">Email</Typography>
          </Breadcrumbs>
        </Container>
      </div>

      <Container component="main" maxWidth="xs">
        <div className={classes.sectionGap}>


          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <MailOutlineIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Mobile"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => dispatch(updateField('mobile', e.target.value))}
              />
              <Button
                type="button"
                fullWidth
                size={'large'}
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => dispatch(login(mobile)).then(() => history.push("/otp"))}
                disabled={mobile.length != 10}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
                </Grid>
                <Grid item>

                  {/* <Link href="register" variant="body2">
                Use Mobile to Sign In
              </Link> */}
                </Grid>
              </Grid>
            </form>
          </div>


        </div>
      </Container>
    </>
  );
}