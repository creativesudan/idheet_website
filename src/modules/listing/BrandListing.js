import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Breadcrumbs, Link, Typography, Grid, Paper, Button } from '@material-ui/core';
import { HeadingBar, QtyController } from '../component/index'
import { Filter } from './index'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../redux/actions/home';
import { useHistory } from 'react-router-dom';

const Category = [
  { id: 1, name: 'Vegetables', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/1.svg' },
  { id: 2, name: 'Fruits', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/2.svg' },
  { id: 3, name: 'Meat', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/3.svg' },
  { id: 4, name: 'Seafood', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/4.svg' },
  { id: 5, name: 'Milk & Egg', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/5.svg' },
  { id: 6, name: 'Bread', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/6.svg' },
  { id: 7, name: 'Frozen', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/7.svg' },
  { id: 8, name: 'Organic', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/8.svg' },
  { id: 9, name: 'Fruits', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/1.svg' },
  { id: 10, name: 'Meat', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/2.svg' },
  { id: 11, name: 'Seafood', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/3.svg' },
  { id: 12, name: 'Milk & Egg', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/4.svg' },
  { id: 13, name: 'Bread', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/5.svg' },
  { id: 14, name: 'Vegetables', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/6.svg' },
  { id: 15, name: 'Frozen', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/7.svg' },
  { id: 16, name: 'Organic', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/8.svg' },
  { id: 14, name: 'Vegetables', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/6.svg' },
  { id: 15, name: 'Frozen', icon: 'https://www.zoovi.in/kisanhaat/img/categorie/7.svg' }
]


const useStyles = makeStyles((theme) => ({

  sectionGap: {
    margin: theme.spacing(6, 0)
  },
  BreadcrumbsContainer: {
    padding: '20px 0',
    background: '#e9ecef'
  },
  categoryBox: {
    textAlign: 'center',
    // margin: theme.spacing(1, 0),
    // padding: theme.spacing(0, 1),
    '& img': {
      height: 70,
      display: 'inline-block',
      maxWidth: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      marginBottom: 10
    }
  },
  paper: {
    padding: theme.spacing(2, 1),
  }

}));

export default function BrandListing() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  const brands = useSelector(state => state.home.brands);

  return (
    <>

      <div className={classes.BreadcrumbsContainer}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" href="/">
              Home
            </Link>
            <Typography color="textPrimary">All Brands</Typography>
          </Breadcrumbs>
        </Container>
      </div>
      <Container>
        <div className={classes.sectionGap}>

          <Grid container spacing={2}>
            {brands?.map((item) => (
              <Grid item lg={2} md={3} sm={4} xs={6}>

                <div className={classes.categoryBox}>
                  <Paper elevation={1} classes={{ root: classes.paper }}
                    onClick={() => history.push("/brands/" + item.brand_id)}
                  >
                    <img src={item.image} />
                    <Typography variant="h6" display="block" gutterBottom>{item.brand_name}</Typography>
                  </Paper>
                </div>

              </Grid>
            ))}
          </Grid>

        </div>
      </Container>
    </>
  );
}