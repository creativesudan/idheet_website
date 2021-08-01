import React, { useEffect } from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../redux/actions/order';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  tabs: {

  },
  ordCmp: {
    height: 36,
    width: 36,
    backgroundColor: theme.palette.primary.main,
  },
  ordPnd: {
    height: 36,
    width: 36,
    backgroundColor: theme.palette.secondary.main,
  },
  ordCnc: {
    height: 36,
    width: 36,
    backgroundColor: '#fb522c',
  },
  sectionGap: {
    margin: theme.spacing(6, 0)
  },
  BreadcrumbsContainer: {
    padding: '20px 0',
    background: '#e9ecef'
  },
  List: {
    marginBottom: 16
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 0.5
  },
  bar: {
    padding: 10
  },
  table: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}))

export const ORDER_STATUS = { "pending": "pending", "ongoing": "ongoing", "delivered": "delivered", "cancelled": "cancelled" };

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


export const CompleteOrders = ({ orders }) => {

  const orderList = [
    { orderid: '321DERS', delivery: 'Home', date: '06/04/2020', amount: '12.74', status: 'delivered', },
    { orderid: '321DERS', delivery: 'Home', date: '06/04/2020', amount: '12.74', status: 'delivered', },
    { orderid: '321DERS', delivery: 'Home', date: '06/04/2020', amount: '12.74', status: 'delivered', },
  ]
  const classes = useStyles();
  return (
    <>
      {orders.map((items) => (
        <Link to={"/orders/" + items.id}>
          <Paper className={classes.List}>
            <div className={classes.bar}>
              <div className={classes.header}>
                <div className={classes.flex1}>
                  <CustomBadge color={items.order_status === ORDER_STATUS.pending ? 1 : items.order_status === ORDER_STATUS.cancelled ? 2 : 0}>
                    {items.order_status}
                  </CustomBadge>
                </div>
                <AccessTimeIcon fontSize="small" color="action" />&nbsp;
                <Typography variant='subtitle1' color="textSecondary">
                  {items.created_at}
                </Typography>
              </div>

              <div className={classes.table}>
                <div className={classes.flex2}>
                  <Typography variant='subtitle2' color="textSecondary">Order ID</Typography>
                  <Typography variant='subtitle2' ><b>{items.order_no}</b></Typography>
                </div>
                <div className={classes.flex2}>
                  <Typography variant='subtitle2' color="textSecondary">Delivered to</Typography>
                  <Typography variant='subtitle2' ><b>{items.address1}, {items.address2 && items.address2}, {items.city}</b></Typography>
                </div>
                <div>
                  <Typography variant='subtitle2' color="textSecondary">Total Payment</Typography>
                  <Typography variant='subtitle2' ><b>₹{items.grant_total}</b></Typography>
                </div>
              </div>
            </div>
          </Paper>
        </Link>
      ))}
    </>
  )
}


export const OpenOrders = ({ orders }) => {

  const orderList = [
    { orderid: '321DERS', delivery: 'Home', date: '06/04/2020', amount: '12.74', status: 'On Progress', }
  ]
  const classes = useStyles();
  return (
    <>
      {orders.map((items) => (
        <Link to={"/orders/" + items.id}>
          <Paper className={classes.List}>

            <div className={classes.bar}>
              <div className={classes.header}>
                <div className={classes.flex1}>
                  <CustomBadge color={items.order_status === ORDER_STATUS.pending ? 1 : items.order_status === ORDER_STATUS.cancelled ? 2 : 0}>
                    {items.order_status}
                  </CustomBadge>
                </div>
                <AccessTimeIcon fontSize="small" color="action" />&nbsp;
                <Typography variant='subtitle1' color="textSecondary">
                  {items.created_at}
                </Typography>
              </div>

              <div className={classes.table}>
                <div className={classes.flex2}>
                  <Typography variant='subtitle2' color="textSecondary">Order ID</Typography>
                  <Typography variant='subtitle2' ><b>{items.order_no}</b></Typography>
                </div>
                <div className={classes.flex2}>
                  <Typography variant='subtitle2' color="textSecondary">Deliver to</Typography>
                  <Typography variant='subtitle2' ><b>{items.address1}, {items.address2 && items.address2}, {items.city}</b></Typography>
                </div>
                <div>
                  <Typography variant='subtitle2' color="textSecondary">Total Payment</Typography>
                  <Typography variant='subtitle2' ><b>₹{items.grant_total}</b></Typography>
                </div>
              </div>
            </div>

          </Paper>
        </Link>

      ))
      }
    </>
  )
}


export const CancelledOrders = ({ orders }) => {

  const orderList = [
    { orderid: '321DERS', delivery: 'Home', date: '06/04/2020', amount: '12.74', status: 'Cancelled', }
  ]
  const classes = useStyles();
  return (
    <>
      {orders.map((items) => (
        <Link to={"/orders/" + items.id}>
          <Paper className={classes.List}>
            <div className={classes.bar}>
              <div className={classes.header}>
                <div className={classes.flex1}>
                  <CustomBadge color={items.order_status === ORDER_STATUS.pending ? 1 : items.order_status === ORDER_STATUS.cancelled ? 2 : 0}>
                    {items.order_status}
                  </CustomBadge>
                </div>
                <AccessTimeIcon fontSize="small" color="action" />&nbsp;
                <Typography variant='subtitle1' color="textSecondary">
                  {items.created_at}
                </Typography>
              </div>

              <div className={classes.table}>
                <div className={classes.flex2}>
                  <Typography variant='subtitle2' color="textSecondary">Order ID</Typography>
                  <Typography variant='subtitle2' ><b>{items.order_no}</b></Typography>
                </div>
                <div className={classes.flex2}>
                  <Typography variant='subtitle2' color="textSecondary">Deliver to</Typography>
                  <Typography variant='subtitle2' ><b>{items.address1}, {items.address2 && items.address2}, {items.city}</b></Typography>
                </div>
                <div>
                  <Typography variant='subtitle2' color="textSecondary">Total Payment</Typography>
                  <Typography variant='subtitle2' ><b>₹{items.grant_total}</b></Typography>
                </div>
              </div>
            </div>
          </Paper>
        </Link>
      ))}
    </>
  )
}

export default function OrderListing() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.orders || []);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!orders || orders.length == 0) dispatch(fetchOrders());
  }, []);
  return (
    <>
      <div className={classes.BreadcrumbsContainer}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" to="/">
              <Typography color="primary">Home</Typography>
            </Link>
            <Typography color="textPrimary">My Orders</Typography>
          </Breadcrumbs>
        </Container>
      </div>
      <Container>
        <div className={classes.sectionGap}>




          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item md={3} sm={3} xs={12}>
                <Paper>
                  <Tabs
                    orientation="vertical"
                    // variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                  >
                    <Tab icon={<Avatar className={classes.ordPnd}><AvTimerIcon /></Avatar>} label="On Progress" {...a11yProps(1)} />
                    <Tab icon={<Avatar className={classes.ordCmp}><CheckIcon /></Avatar>} label="Completed" {...a11yProps(0)} />
                    <Tab icon={<Avatar className={classes.ordCnc}><CloseIcon /></Avatar>} label="Cancelled" {...a11yProps(2)} />
                  </Tabs>
                </Paper>
              </Grid>
              <Grid item md={9} sm={9} xs={12}>
                <TabPanel value={value} index={0}>
                  <OpenOrders orders={orders.filter(order => order.order_status == ORDER_STATUS.pending || order.order_status == ORDER_STATUS.ongoing)} />
                </TabPanel>
                <TabPanel value={value} index={1} className={{ root: classes.testMe }}>
                  <CompleteOrders orders={orders.filter(order => order.order_status == "delivered")} />
                </TabPanel>

                <TabPanel value={value} index={2}>
                  <CancelledOrders orders={orders.filter(order => order.order_status == "cancelled")} />
                </TabPanel>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </>
  );
}