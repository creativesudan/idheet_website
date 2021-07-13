import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container,Breadcrumbs,Link,Typography} from '@material-ui/core';
import {ProductSuggestion, DetailView} from './index'

const useStyles = makeStyles((theme) => ({
  sectionGap:{
    margin: theme.spacing(6, 0)
  },
  BreadcrumbsContainer:{
    padding:'20px 0',
    background:'#e9ecef'
  },
}))

export default function ProductDetail() {
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
          Listing
          </Link>
          <Typography color="textPrimary">Product Details</Typography>
        </Breadcrumbs>
      </Container>
    </div>
    <Container>
      <div className={classes.sectionGap}>
          <DetailView/>
          <ProductSuggestion/>
      </div>
    </Container>
    </>
  );
}