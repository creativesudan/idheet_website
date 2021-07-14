import React from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import { Container,Breadcrumbs,Link,Typography,Paper,Grid,Divider} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import CloseIcon from '@material-ui/icons/Close';

import {CustomBadge} from '../component/index'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PhoneIcon from '@material-ui/icons/Phone';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  sectionGap:{
    margin: theme.spacing(6, 0)
  },
  BreadcrumbsContainer:{
    padding:'20px 0',
    background:'#e9ecef'
  },
 
}))




export default function OrderDetail() {
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

          <Paper>
              <Typography variant='subtitle1' color="textSecondary">
                16 June, 11:30AM
              </Typography>
              <Divider/>

              <Typography variant='h5' color="textPrimary">
                Order Status
              </Typography>

              <Box>
                
                <Typography variant='subtitle1' color="textSecondary">
                  Preparing order
                </Typography>
              </Box>

          </Paper>      

      </div>
    </Container>
    </>
  );
}