import React, { useEffect, useState } from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Breadcrumbs, Link, Typography, Paper, Grid, Divider, TextField } from '@material-ui/core';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LeftPanel from './LeftPanel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../../redux/actions/auth';
import { saveAddress, updateAddAddressField, updateAddress, updateAddressField, updateEditAddressField } from '../../redux/actions/address';


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
  badge: {
    position: 'absolute',
    left: 0,
    fontSize: 12,
    color: '#ff6000',
    backgroundColor: '#ffe7d9',
    padding: theme.spacing(0.5, 1.2),
    borderRadius: 4,
    display: 'inline-block',
    fontWeight: 600,
  },
  content: {},
  editBtn: {},
  addressStyle: {
    border: '1px solid #ccc',
    margin: '10px 0',
    '& $content': {
      padding: '15px',
      position: 'relative',
      '& $badge': {
        right: 10,
        top: 10,
        left: 'auto'
      },
      '& $editBtn': {
        marginTop: 20,
        textAlign: 'right'
      }
    },
  },
  dailog_width: {
    minWidth: 400
  },
  addressField: {
    margin: '15px 0'
  }

}))



export default function AddressListView() {
  const classes = useStyles();
  const user = useSelector(state => state.auth.user);
  const addresses = useSelector(state => state.address.addresses);
  const deliveryAddress = useSelector(state => state.app.address);
  const dispatch = useDispatch();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);

  const newAddress = {
    type: { type: "Home", id: 1 }
  }
  const [editAccount, setEditAccount] = useState(false);
  const [addAccount, setAddAccount] = useState(false);
  const addAddress = useSelector(state => state.address.addAddress || {});
  const editAddress = useSelector(state => state.address.editAddress || {});



  const handleClickOpen = (address) => {
    setEditAccount(true);
    dispatch(updateAddressField("editAddress", address))
  };

  const handleClose = () => {
    setEditAccount(false);
  };

  const AddOpen = () => {
    setAddAccount(true);
    dispatch(updateAddressField("addAddress", newAddress));
  };

  const AddClose = () => {
    setAddAccount(false)
  };


  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [formats, setFormats] = React.useState(editAddress?.type?.id);

  const handleFormat = (event, newFormats) => {
    // setFormats(newFormats);
    dispatch(updateEditAddressField("type", { "id": newFormats }))
    console.log(newFormats);
  };

  const handleAddType = (event, newFormats) => {
    // setFormats(newFormats);
    dispatch(updateAddAddressField("type", { "id": newFormats }))
    console.log(newFormats);
  };

  return (
    <>
      <Dialog
        open={editAccount}
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><b>Edit Address</b></DialogTitle>
        <DialogContent>
          <div className={classes.dailog_width}>
            <ToggleButtonGroup value={editAddress?.type?.id} size="small" onChange={handleFormat} exclusive aria-label="text formatting">
              <ToggleButton value={1} aria-label={1}>
                <b>Home</b>
              </ToggleButton>
              <ToggleButton value={0} aria-label={0}>
                <b>office</b>
              </ToggleButton>
              <ToggleButton value={2} aria-label={2}>
                <b>Other</b>
              </ToggleButton>
            </ToggleButtonGroup>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Address Line 1"
                variant="outlined"
                size="small"
                fullWidth
                value={editAddress.address1 || ""}
                onChange={(e) => {
                  dispatch(updateEditAddressField("address1", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Address Line 2"
                variant="outlined"
                size="small"
                fullWidth
                value={editAddress.address2 || ""}
                onChange={(e) => {
                  dispatch(updateEditAddressField("address2", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="pincode"
                variant="outlined"
                size="small"
                fullWidth
                value={editAddress.pincode || ""}
                onChange={(e) => {
                  dispatch(updateEditAddressField("pincode", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Enter City"
                variant="outlined"
                size="small"
                fullWidth
                value={editAddress.city || ""}
                onChange={(e) => {
                  dispatch(updateEditAddressField("city", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Enter State"
                variant="outlined"
                size="small"
                fullWidth
                value={editAddress.state || ""}
                onChange={(e) => {
                  dispatch(updateEditAddressField("state", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Enter Phone"
                variant="outlined"
                size="small"
                fullWidth
                value={editAddress.phone || ""}
                onChange={(e) => {
                  dispatch(updateEditAddressField("phone", e.target.value))
                }}
              />
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={editAddress.default_address || false}
                  name="checkedB"
                  color="primary"
                  onClick={() => dispatch(updateEditAddressField("default_address", !editAddress.default_address))}
                />
              }
              label="Default Address"
            />


          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={() => dispatch(updateAddress(editAddress)).then(() => setEditAccount(false))} color="primary" autoFocus>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>










      <Dialog
        open={addAccount}
        fullScreen={fullScreen}
        onClose={AddClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><b>Add Address</b></DialogTitle>
        <DialogContent>
          <div className={classes.dailog_width}>
            <ToggleButtonGroup value={addAddress?.type?.id} size="small" onChange={handleAddType} exclusive aria-label="text formatting">
              <ToggleButton value={1} aria-label="bold">
                <b>Home</b>
              </ToggleButton>
              <ToggleButton value={0} aria-label="italic">
                <b>office</b>
              </ToggleButton>
              <ToggleButton value={2} aria-label="underlined">
                <b>Other</b>
              </ToggleButton>
            </ToggleButtonGroup>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Address Line 1"
                variant="outlined"
                size="small"
                fullWidth
                value={addAddress.address1 || ""}
                onChange={(e) => {
                  dispatch(updateAddAddressField("address1", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Address Line 2"
                variant="outlined"
                size="small"
                fullWidth
                value={addAddress.address2 || ""}
                onChange={(e) => {
                  dispatch(updateAddAddressField("address2", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="pincode"
                variant="outlined"
                size="small"
                fullWidth
                value={addAddress.pincode || ""}
                onChange={(e) => {
                  dispatch(updateAddAddressField("pincode", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Enter City"
                variant="outlined"
                size="small"
                fullWidth
                value={addAddress.city || ""}
                onChange={(e) => {
                  dispatch(updateAddAddressField("city", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Enter State"
                variant="outlined"
                size="small"
                fullWidth
                value={addAddress.state || ""}
                onChange={(e) => {
                  dispatch(updateAddAddressField("state", e.target.value))
                }}
              />
            </div>

            <div className={classes.addressField}>
              <TextField
                id="outlined-basic"
                label="Enter Phone"
                variant="outlined"
                size="small"
                fullWidth
                value={addAddress.phone || ""}
                onChange={(e) => {
                  dispatch(updateAddAddressField("phone", e.target.value))
                }}
              />
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={addAddress.default_address || false}
                  name="checkedB"
                  color="primary"
                  onChange={(e) => {
                    dispatch(updateAddAddressField("default_address", !addAddress.default_address))
                  }}
                />
              }
              label="Default Address"
            />


          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={AddClose} color="primary">
            Close
          </Button>
          <Button onClick={() => dispatch(saveAddress(addAddress)).then(() => setAddAccount(false))} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>

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
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography variant="h4"><b>Addresses</b></Typography>
                    </Grid>
                    <Grid item>
                      <Button color="primary" onClick={AddOpen}>Add Address</Button>
                    </Grid>
                  </Grid>


                  <Grid container spacing={3}>
                    {addresses?.map(address => (<Grid item lg={12}>
                      <div className={classes.addressStyle}>
                        <div className={classes.addressType}>
                          <div className={classes.content}>
                            <Typography><b>{address.type?.type}</b></Typography>
                            {address.default_address && <span className={classes.badge} color="textSecondary" gutterBottom>
                              Default
                            </span>}
                            <Typography variant="caption">
                              {address.address1}, {address.address2}, {address.city}, {address.state} {address.pincode}
                            </Typography>
                            <div className={classes.editBtn}>
                              <Button variant="outlined" color="secoundry" size="small">
                                Delete
                              </Button> &nbsp;
                              <Button variant="outlined" color="primary" size="small" onClick={() => handleClickOpen(address)}>
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>))}

                  </Grid>


                </div>
              </Paper>
            </Grid>
          </Grid>

        </div>
      </Container>
    </>
  );
}