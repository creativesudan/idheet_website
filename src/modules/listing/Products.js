import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Typography, Button, Card, CardContent, CardMedia, Grid, Box } from '@material-ui/core';
import { HeadingBar, QtyController } from '../component/index'
import { Filter } from './index'
import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import { useHistory } from 'react-router-dom';
import { getCartItem } from '../../redux/lib/cart';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateItem } from '../../redux/actions/cart';


const Product = [
  { id: 1, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v1.jpg" },
  { id: 2, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v2.jpg" },
  { id: 3, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v3.jpg" },
  { id: 4, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v4.jpg" },
  { id: 5, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v5.jpg" },
  { id: 6, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v1.jpg" },
  { id: 7, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v2.jpg" },
  { id: 8, name: 'chilli', discPer: '10', price: '0.8', perunit: 'kg', image: "https://www.zoovi.in/kisanhaat/img/listing/v3.jpg" },
]

const useStyles = makeStyles((theme) => ({

  badge: {
    fontSize: 12,
    color: '#ff6000',
    backgroundColor: '#ffe7d9',
    padding: theme.spacing(0.5, 1.2),
    borderRadius: 4,
    display: 'inline-block',
    fontWeight: 600
  },
  media: {
    display:'inline-block',
    flex: 1,
    height: 170,
    maxWidth: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  },
  thumb_cover: {
    marginBottom:15,
    textAlign: 'center',
    '& img':{
      display:'inline-block'
    }
  },
  priceBar: {
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    paddingBottom: `${theme.spacing(2)}px !important`,
  },

}));


const BRACKETS = 4;
const SORT_DEFAULT = 0;
const SORT_INCREASING_BY_PRICE = 1;
const SORT_DECREASING_BY_PRICE = 2;

const getBrands = (products) => {
  if (!products || products.length == 0) return [];
  return Array.from(new Set(products.filter(product => !!product.brand).map(product => product.brand.brand_id))).map(id => {
    const brand = products.find(product => product.brand.brand_id === id).brand.brand;
    if (brand) {
      return {
        brand_id: id,
        brand: brand
      }
    }
  });
}

const getDynamicPriceBrackets = (products) => {
  if (!products || products.length == 0) return [];

  const prices = products.map(product => product.discountedPrice);
  if (!prices) return [];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const diff = (maxPrice - minPrice) / BRACKETS;

  let result = [];
  for (let i = 1; i <= BRACKETS; i++) {
    let count = 0;
    let tempMin = minPrice + (i - 1) * diff;
    let tempMax = minPrice + i * diff;
    prices.map(price => {
      if (price >= tempMin && price < tempMax) count += 1;
    });
    result.push({
      id: i,
      minPrice: tempMin,
      maxPrice: tempMax,
      count: count
    });

  }

  return result;

}

const getPriceBrackets = (products) => {
  if (!products || products.length == 0) return [];

  const prices = products.map(product => product.discountedPrice);

  const minPrice = 0;
  const maxPrice = 2000;
  const diff = (maxPrice - minPrice) / BRACKETS;

  let result = [];
  for (let i = 1; i <= BRACKETS; i++) {
    let count = 0;
    let tempMin = minPrice + (i - 1) * diff;
    let tempMax = minPrice + i * diff;
    prices.map(price => {
      if (price >= tempMin && price < tempMax) count += 1;
    });
    result.push({
      id: i,
      minPrice: tempMin,
      maxPrice: tempMax,
      count: count
    });

  }

  return result;

}

const applyFilterAndSort = (products, filter, sort) => {
  if (!products || products.length == 0) return [];
  let resultProducts = [...products];

  // Filter
  const filterBrands = filter.brands && filter.brands.filter(brand => brand.checked);
  const filterBrackets = filter.priceBrackets && filter.priceBrackets.filter(bracket => bracket.checked);
  if (filterBrands && filterBrands.length != 0) {
    resultProducts = resultProducts.filter(product => {
      let keep = false;
      for (let i = 0; i < filterBrands.length; i++) {
        if (product.brand && product.brand.brand_id == filterBrands[i].brand_id) {
          keep = true;
          break;
        }
      }
      return keep;
    })
  }

  if (filterBrackets && filterBrackets.length != 0) {
    resultProducts = resultProducts.filter(product => {
      let keep = false;
      for (let i = 0; i < filterBrackets.length; i++) {

        if (product.price && product.discountedPrice >= filterBrackets[i].minPrice && product.discountedPrice < filterBrackets[i].maxPrice) {
          keep = true;
          break;
        }
      }
      return keep;
    })
  }

  // Sort

  if (sort == SORT_INCREASING_BY_PRICE) {
    resultProducts = resultProducts.sort((p1, p2) => p1.discountedPrice - p2.discountedPrice);
  }

  if (sort == SORT_DECREASING_BY_PRICE) {
    resultProducts = resultProducts.sort((p1, p2) => p2.discountedPrice - p1.discountedPrice);
  }

  return resultProducts;
}
export default function Products({ products, title }) {
  const classes = useStyles();
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(SORT_DEFAULT);
  const [localProducts, setLocalProducts] = useState(products);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const cartItems = useSelector(state => state.cart.items);
  const cartLoading = useSelector(state => state.cart.cartLoading);
  const dispatch = useDispatch();



  useEffect(() => {
    setLocalProducts(applyFilterAndSort(products, filter, sort));
  }, [filter]);

  useEffect(() => {
    setLocalProducts(applyFilterAndSort(products, filter, sort));
  }, [sort]);

  useEffect(() => {
    setLocalProducts(products);
    return () => setLocalProducts([]);
  }, [products]);

  // useEffect(() => {
  //   setOpen(filterOpen);
  // }, [filterOpen]);

  useEffect(() => {
    const brands = getBrands(products);
    const priceBrackets = getPriceBrackets(products);
    setFilter({ brands, priceBrackets });
    return () => setFilter({});
  }, [products]);


  const isBrandChecked = (filter, brand) => {
    if (!filter.brands) return false;
    const found = filter.brands.find(b => b.brand_id == brand.brand_id);
    if (found) return found.checked;
    return false;
  }

  const isBracketChecked = (filter, bracket) => {
    if (!filter.priceBrackets) return false;
    const found = filter.priceBrackets.find(p => p.id == bracket.id);
    if (found) return found.checked;
    return false;
  }

  const handleQtyDec = (cartItem) => {
    dispatch(removeItem(cartItem));
  }

  const handleQtyInc = (cartItem) => {
    dispatch(updateItem(cartItems, cartItem));
  }

  return (
    <>
      <Filter
        drawerState={open}
        onClose={() => setOpen(false)}
        filter={filter}
        sort={sort}
        setFilter={setFilter}
        setSort={setSort}
        isBracketChecked={isBracketChecked}
        isBrandChecked={isBrandChecked}
      />
      <HeadingBar
        variant="h4"
        title={title}
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
      />


      <Grid container spacing={2}>

        {localProducts?.map(item => {
          const cartItem = getCartItem(cartItems, item);
          return (
            <Grid item md={3} sm={6} xs={12}>
              <Card className={classes.root}>
                <CardContent classes={{ root: classes.card }}>
                  <span className={classes.badge} color="textSecondary" gutterBottom>
                    {item.discountPercentage}%
                  </span>
                  
                  <Link to={"/product/" + item.id}>
                    <div className={classes.thumb_cover}>
                      <img src={item.image} className={classes.media} title={item.name}/>
                    </div>
                  </Link>

                  <Link to={"/product/" + item.id}>
                    <Typography variant="h6" noWrap="true">
                      {item.name}
                    </Typography>
                  </Link>

                  <Grid container container justify="space-between" direction="row" alignItems="center">

                    <Grid item>
                      <Typography variant="h6" color="primary">
                        ₹{item.discountedPrice}/{item.displayWeight}
                      </Typography>
                    </Grid>


                    <Grid item>
                      <QtyController qty={cartItem.qty} cartItem={cartItem} handleQtyDec={handleQtyDec} handleQtyInc={handleQtyInc} disabled={cartLoading} />
                    </Grid>
                  </Grid>

                </CardContent>

              </Card>
            </Grid>
          )
        })}
      </Grid>
    </>
  );
}