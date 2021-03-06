import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Container, Breadcrumbs, Typography, Grid, Paper, Button } from '@material-ui/core';
import { HeadingBar, QtyController } from '../component/index'
import { Filter } from './index'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CategorySlider } from '../home';

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
      height: 60,
      display: 'inline-block',
      marginBottom: 20
    }
  },
  paper: {
    padding: theme.spacing(2, 1),
  }

}));

export default function CategoryListing() {
  const classes = useStyles();
  const categories = useSelector(state => state.home.categories?.sort((a, b) => (a.rank || 0) - (b.rank || 0)));
  const history = useHistory();

  const getSubs = (parent) => {
    return categories?.filter(category => category.parent == parent.name);
  }

  return (
    <>

      <div className={classes.BreadcrumbsContainer}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" to="/">
              <Typography color="primary">Home</Typography>
            </Link>
            <Typography color="textPrimary">Categories</Typography>
          </Breadcrumbs>
        </Container>
      </div>
      <Container>
        <div className={classes.sectionGap}>

          <CategorySlider categories={categories?.filter(category => !category.parent)} onClick={(category) => history.push("/category/" + category.id)} title="What are you looking for?" button={false} />

          {categories?.filter(category => !category.parent).map((parent) => {
            const subs = getSubs(parent);
            return subs.length > 0 ? <>
              <div className={classes.sectionGap}>
                <HeadingBar title={parent.name} />
                <Grid container spacing={2}>
                  {subs?.map(sub => {

                    return <Grid item lg={2} md={3} sm={4} xs={6}>

                      <div className={classes.categoryBox}>
                        <Link to={"/category/" + sub.id}>
                          <Paper elevation={1} classes={{ root: classes.paper }}>
                            <img src={sub.icon} />
                            <Typography variant="h6" display="block" gutterBottom>{sub.name}</Typography>
                          </Paper>
                        </Link>
                      </div>

                    </Grid>
                  })}
                </Grid>
              </div>
            </> : <></>

          })}


        </div>
      </Container>
    </>
  );
}