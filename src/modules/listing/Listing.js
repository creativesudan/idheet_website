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
import { fetchCategories, fetchProducts } from '../../redux/actions/home';

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

export default function ProductListing() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { category_id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.home.products || []);
  const categories = useSelector(state => state.home.categories || []);
  const category = categories?.find(item => item.id == category_id) || {};
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category_id);


  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProducts(selectedCategory));
    }
    // dispatch(fetchCategories());
  }, [selectedCategory]);

  useEffect(() => {
    if (category) setSubcategories(categories?.filter(item => item.parent == category?.name));
  }, [category])

  useEffect(() => {
    setSelectedCategory(category_id);
  }, [category_id]);

  useEffect(() => {
    console.log("DKJCWVKEWVK")
    if (subcategories && subcategories.length > 0) setSelectedCategory(subcategories[0]?.id);
  }, [subcategories]);

  return (
    <>
      <div className={classes.BreadcrumbsContainer}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" href="/">
              Home
            </Link>
            <Typography color="textPrimary">Listing</Typography>
          </Breadcrumbs>
        </Container>
      </div>
      <Container>
        <div className={classes.sectionGap}>
          <CategorySlider categories={subcategories} onClick={(category) => setSelectedCategory(category.id)} title="Sub Categories" />
          {/* <Filter drawerState={open} /> */}

          {/* <HeadingBar
            variant="h4"
            title={category.name}
            button={
              <>
                <Box mx={1}>
                  <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
                    <FilterListIcon fontSize="small" />&nbsp;Filter
                  </Button>
                </Box>
                <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
                  <SortIcon fontSize="small" />&nbsp;Sort
                </Button>
              </>
            }
          /> */}
          <Products products={products} title={category.name} />
        </div>
      </Container>
    </>
  );
}
