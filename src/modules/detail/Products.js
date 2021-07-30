import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Card, CardContent, CardMedia, Grid, Box, FormControl, Select, MenuItem } from '@material-ui/core';
import { HeadingBar, QtyController } from '../component/index'
import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import { Filter } from './index'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItem } from '../../redux/lib/cart';
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
    display: 'inline-block',
    flex: 1,
    height: 170,
    maxWidth: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  },
  thumb_cover: {
    marginBottom: 15,
    textAlign: 'center',
    '& img': {
      display: 'inline-block'
    }
  },
  priceBar: {
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    paddingBottom: `${theme.spacing(2)}px !important`,
  },
  fullWidth: {
    width: "100%",
    marginBottom: 10
  }

}));



export default function ProductSuggestion({ products }) {
  const classes = useStyles();


  const [selectedVariant, setSelectedVariant] = useState({});

  useEffect(() => {
    let result = {};
    products?.map(p => {
      result[p.id] = p.defaultVariant;
    });
    setSelectedVariant(result);
  }, [products]);

  return (
    <>


      <HeadingBar
        title="Maybe You Like this."
      />
      <Grid container spacing={2}>

        {products && products.map(item => {

          return (
            <Grid item md={3} sm={6} xs={12}>
              <Card className={classes.root}>
                <CardContent classes={{ root: classes.card }}>
                  <span className={classes.badge} color="textSecondary" gutterBottom>
                    {item.discountPercentage}%
                  </span>
                  <Link to={"/product/" + item.id}>
                    <div className={classes.thumb_cover}>
                      <img src={item.image} className={classes.media} title={item.name} />
                    </div>
                  </Link>

                  <Link to={"/product/" + item.id}>
                    <Typography gutterBottom noWrap="true" variant="h6">
                      {item.name}
                    </Typography>
                  </Link>
                  <FormControl className={classes.fullWidth}>
                    {/* <InputLabel id="demo-customized-select-label">Age</InputLabel> */}
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      value={selectedVariant[item.id]?.id.toString() || ""}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setSelectedVariant({ ...selectedVariant, [item.id]: item.variants?.find(v => v.id == parseInt(e.target.value)) });
                        // cartItem = getVariantCartItem(cartItems, item, e.target.value);

                      }}
                    // input={ }
                    >
                      {item.variants?.map(variant => <MenuItem value={variant.id.toString()}>{variant.displayWeight}</MenuItem>)}
                      {/* <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                  </FormControl>

                  <Grid container container justify="space-between" direction="row" alignItems="center">

                    <Grid item>
                      <Typography variant="h6" color="primary">
                        ₹{item.discountedPrice}/{item.displayWeight}
                      </Typography>
                    </Grid>


                    <Grid item>
                      <QtyController product={item} variant={selectedVariant[item.id]} />
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