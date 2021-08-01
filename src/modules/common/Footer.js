import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import {Link} from "react-router-dom";
import { Button, TextField, Divider, Fab, Box, Grid, Container, Typography, Link } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useSelector } from 'react-redux';
import slugify from 'react-slugify';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff',
    width: '100%',
    borderTop: '1px solid #dee2e6'
  },
  subscriber: {
    textAlign: 'center'
  },
  topBar: {
    padding: '24px 0'
  },
  subscriberBtn: {
    height: 40,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  subcribeField: {
    borderTopRightRadius: 0,

  },
  appIcon: {
    height: 30,
  },
  socialIcon: {
    boxShadow: 'none',
    background: '#f0f0f0',
    '& svg': {
      fontSize: 16
    }
  },
  socialMedia:{
    margin:'0 -5px'
  },
  socialList: {
    margin: '10px 5px'
  },
  AppiconGroup:{
    margin:'30px -5px 0 -5px'
  }

}));

export function FooterLinks(props) {
  return (
    <Box component="span" display="block" py={0.2}>
      <Link href={props.link} variant="caption" color="textSecondary">{props.label}</Link>
    </Box>
  )
}

export default function Footer() {
  const classes = useStyles();
  const cmsList = useSelector(state => state.app.cmsList);
  const settings = useSelector(state => state.app.settings);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const categories = useSelector(state => state.home.categories?.filter(category => !category.parent));

  return (
    <>
      <div className={classes.root}>



        <Box py={4}>
          <Container>
            <Grid container
              direction="row"
              justify="space-between"
              alignItems="flex-start">

            < Grid item item md={2} lg={2} sm={12} sm={2}>
                <Box component="span" display="block" py={1}>
                  <Typography variant="h6">Quick Links</Typography>
                </Box>
              {isAuthenticated ?<>
                <FooterLinks label="My account" link="/my-account" />
                <FooterLinks label="My Address" link="/address" />
                <FooterLinks label="My Orders" link="/orders" />
                <FooterLinks label="My Enquiries" link="/enquiry" />
                <FooterLinks label="Promos" link="/promo" />
              </>
                :
                <>
                  <FooterLinks label="Login" link="/login" />
                  <FooterLinks label="Promos" link="/promo" />
                </>
              }
              </Grid>


              <Grid item md={5} lg={6} sm={7}>
                <Box component="span" display="block" py={1}>
                  <Typography variant="h6">Category</Typography>
                </Box>
                <Grid container>
                  {categories?.map(category => <Grid item lg={3} md={4} sm={3} xs={6}>
                    <FooterLinks label={category.name} link={"/category/" + category.id} />
                  </Grid>)}

                </Grid>
              </Grid>

              <Grid item lg={2} md={2} sm={3} xs={12}>
                <Box component="span" display="block" py={1}>
                  <Typography variant="h6">Information</Typography>
                </Box>
                {cmsList?.map(cms => <FooterLinks label={cms?.title} link={"/" + slugify(cms.title)} />)}
              </Grid>

              <Grid item lg={2} md={3} xs={12}>
                <Box component="span" display="block" py={1}>
                  <Typography variant="h6">Social Media</Typography>
                </Box>


                <div className={classes.socialMedia}>
                  <Box component="div" display="inline" className={classes.socialList}>
                    <Link href={settings?.facebook} variant="caption" color="textSecondary">
                      <Fab color="inherit" aria-label="add" size="small" classes={{ root: classes.socialIcon }}>
                        <FacebookIcon />
                      </Fab>
                    </Link>
                  </Box>
                  
                  <Box component="div" display="inline" className={classes.socialList}>
                    <Link href={settings?.twitter} variant="caption" color="textSecondary">
                      <Fab color="inherit" aria-label="add" size="small" classes={{ root: classes.socialIcon }}>
                        <TwitterIcon />
                      </Fab>
                    </Link>
                  </Box>
                  
                  <Box component="div" display="inline" className={classes.socialList}>
                    <Link href={settings?.instagram} variant="caption" color="textSecondary">
                      <Fab color="inherit" aria-label="add" size="small" classes={{ root: classes.socialIcon }}>
                        <InstagramIcon />
                      </Fab>
                    </Link>
                  </Box>

                  <Box component="div" display="inline" className={classes.socialList}>
                    <Link href={settings?.youtube} variant="caption" color="textSecondary">
                      <Fab color="inherit" aria-label="add" size="small" classes={{ root: classes.socialIcon }}>
                        <YouTubeIcon />
                      </Fab>
                    </Link>
                  </Box>

                  <Box component="div" display="block" className={classes.AppiconGroup}>
                    <Box component="span" display="inline" mx={1}>
                      <Link href={settings?.appstore}><img src="https://www.zoovi.in/kisanhaat/img/appstore.png" className={classes.appIcon} /></Link>
                    </Box>
                    <Box component="span" display="inline" mx={1}>
                      <Link href={settings?.playstore}><img src="https://www.zoovi.in/kisanhaat/img/playmarket.png" className={classes.appIcon} /></Link>
                    </Box>
                  </Box>
                  
                </div>

              </Grid>


            </Grid>
          </Container>
        </Box>
        <Divider />
        <Box py={4}>
          <Container>
            <center>
            <Typography variant="caption">© 2021 {settings?.app_name}</Typography>
            </center>
          </Container>
        </Box>

      </div>
    </>
  );
}
