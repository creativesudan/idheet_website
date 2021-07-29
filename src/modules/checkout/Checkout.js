import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Container,Breadcrumbs,Typography} from '@material-ui/core';
import { CartView} from './index'

const useStyles = makeStyles((theme) => ({
  sectionGap:{
    margin: theme.spacing(6, 0)
  },
  BreadcrumbsContainer:{
    padding:'20px 0',
    background:'#e9ecef'
  },
}))

export default function CheckoutProcess() {
  const classes = useStyles();
  return (
    <>
    <div className={classes.BreadcrumbsContainer}>
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="primary" to="/">
            <Typography color="primary">Home</Typography>
          </Link>
          <Link color="primary" to="/">
            <Typography color="primary">Listing</Typography>
          </Link>
          <Typography color="textPrimary">Cart</Typography>
        </Breadcrumbs>
      </Container>
    </div>
    <Container>
      <div className={classes.sectionGap}>
          <CartView/>
      </div>
    </Container>
    </>
  );
}