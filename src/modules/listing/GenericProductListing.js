import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Breadcrumbs, Link, Typography, Box, Button } from '@material-ui/core';
import { HeadingBar } from '../component/index'
import { Products } from './index'
import { Filter } from './index'
import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBrandProducts, fetchBrands, fetchCategories, fetchProducts } from '../../redux/actions/home';

import { CategorySlider } from '../home/index'



const useStyles = makeStyles((theme) => ({
  sectionGap: {
    margin: theme.spacing(6, 0)
  },
  BreadcrumbsContainer: {
    padding: '20px 0',
    background: '#e9ecef'
  },
}))

export default function GenericProductListing() {
  const classes = useStyles();




  return (
    <>
      <div className={classes.BreadcrumbsContainer}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" href="/">
              Home
            </Link>
            <Typography color="textPrimary">{title}</Typography>
          </Breadcrumbs>
        </Container>
      </div>
      <Container>
        <div className={classes.sectionGap}>
          {/* <CategorySlider categories={subcategories} onClick={(category) => setSelectedCategory(category.id)} title="Sub Categories" /> */}
          {/* <Filter drawerState={open} />

          <HeadingBar
            variant="h4"
            title={brand?.brand_name}
            button={
              <>
                <Box mx={1}>
                  <Button variant="outlined" size="small" onClick={() => setOpen(!open)}>
                    <FilterListIcon fontSize="small" />&nbsp;Filter
                  </Button>
                </Box>
                <Button variant="outlined" size="small" onClick={() => setOpen(!open)}>
                  <SortIcon fontSize="small" />&nbsp;Sort
                </Button>
              </>
            }
          /> */}
          <Products products={products} title={title} />
        </div>
      </Container>
    </>
  );
}
