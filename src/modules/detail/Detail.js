import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Breadcrumbs, Link, Typography } from '@material-ui/core';
import { ProductSuggestion, DetailView } from './index'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchExclusiveProducts, fetchProductById } from '../../redux/actions/home';

const useStyles = makeStyles((theme) => ({
  sectionGap: {
    margin: theme.spacing(6, 0)
  },
  BreadcrumbsContainer: {
    padding: '20px 0',
    background: '#e9ecef'
  },
}))

export default function ProductDetail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { product_id } = useParams();
  const product = useSelector(state => state.home.activeProduct || {});
  const exclusiveProducts = useSelector(state => state.home.exclusiveProducts);


  useEffect(() => {
    if (product_id) dispatch(fetchProductById(product_id));
  }, [product_id]);

  useEffect(() => {
    if (!exclusiveProducts) dispatch(fetchExclusiveProducts());
  }, []);

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
          <DetailView product={product} />
          <ProductSuggestion products={exclusiveProducts} />
        </div>
      </Container>
    </>
  );
}