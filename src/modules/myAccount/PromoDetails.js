import React, { useEffect, useRef, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import { fetchCoupons } from '../../redux/actions/cart';


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
  Avatar: {
    display: 'block',
    '& img': {
      objectFit: 'cover',
      objectPositon: 'center',
      width: '100%',
      height: 250,
      borderRadius: 10
    }
  },
}))



export default function PromoDetailView() {
  const classes = useStyles();
  const user = useSelector(state => state.auth.user);
  const { promo_id } = useParams();
  const dispatch = useDispatch();
  const list = useSelector(state => state.cart.coupons);

  const [promo, setPromo] = useState(null);
  
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  };

  useEffect(() => {
    if (!list) dispatch(fetchCoupons());
    else {
      setPromo(list?.find(promo => promo.coupon_id == promo_id));
    }
  }, [list, promo_id]);

 
  return (
    <>
      <div className={classes.BreadcrumbsContainer}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" href="/">
              Home
            </Link>
            <Link color="primary" href="/">
              Promos
            </Link>
            <Typography color="textPrimary">Promo Detail</Typography>
          </Breadcrumbs>
        </Container>
      </div>
      <Container>
        <div className={classes.sectionGap}>
          <Grid container spacing={3}>
            <Grid item md={4}  sm={12} xs={12}>
              <LeftPanel user={user} />
            </Grid>
            <Grid item md={8}  sm={12} xs={12}>
              <Paper>
                <div className={classes.detailView}>
                  <div className={classes.frame}>

                    <span className={classes.Avatar}>
                      <img src={promo?.image} />
                    </span>
                    <br />

        
                    <div style={{opacity:'0', height:'0', position:'absolute'}}>
                        {
                        document.queryCommandSupported('copy') &&<></>
                        }
                        <form>
                          <textarea
                            ref={textAreaRef}
                            value={promo?.coupon_code}
                          />
                        </form>
                      </div>
    
                    <Typography color="primary" variant="h5" gutterBottom>
                      <b id='clipboard'>{promo?.title}</b>
                    </Typography>

                    <Divider style={{marginBottom:20}}/>

                    <Grid container justify="space-between" alignItems="center">

                      <Grid item>
                        <Typography color="textPrimary" variant="h6">
                          <b id='clipboard'>Code: {promo?.coupon_code}</b>
                        </Typography>
                        <Typography variant="caption" color="textSecondary">Available until {promo?.end_date}</Typography>
                      </Grid>
                      <Grid>
                        <Button onClick={copyToClipboard} variant="contained" color="primary" size="large">Copy</Button>



                      </Grid>
                    </Grid>
                    <br />
                    <Typography variant="h6">
                      <b>Terms & Conditions</b>
                    </Typography>

                    <Typography variant="caption">
                      {promo?.description}
                    </Typography>
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