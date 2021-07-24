import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import {Link} from "react-router-dom";
import { Button, Breadcrumbs, TextField, Divider, Fab, Box, Grid, Container, Typography, Link } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  sectionGap: {
    margin: theme.spacing(6, 0)
  },
  BreadcrumbsContainer: {
    padding: '20px 0',
    background: '#e9ecef'
  },
}));

export function FooterLinks(props) {
  return (
    <Box component="span" display="block" py={0.2}>
      <Link href={props.link} variant="caption" color="textSecondary">{props.label}</Link>
    </Box>
  )
}

export default function ContentView() {
  const classes = useStyles();

  return (
    <>
     
     <div className={classes.BreadcrumbsContainer}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" href="/">
              Home
            </Link>
            <Typography color="textPrimary">About Us</Typography>
          </Breadcrumbs>
        </Container>
      </div>
      <Container>
        <div className={classes.sectionGap}>
          <Typography>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
          The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, 
          content here', making it look like readable English. 

          Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, 
          and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, 
          sometimes by accident, sometimes on purpose (injected humour and the like).
          </Typography>
        </div>
      </Container>
    </>
  );
}
