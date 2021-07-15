import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Card, CardContent, CardMedia, Grid, Box } from '@material-ui/core';
import { HeadingBar, QtyController } from '../component/index'
import { Filter } from './index'


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
    flex: 1,
    height: 170
  },
  priceBar: {
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    paddingBottom: `${theme.spacing(2)}px !important`,
  },

}));



export default function Products({ products }) {
  const classes = useStyles();

  return (
    <>


      <Grid container spacing={2}>

        {products && products.map(item => {
          return (
            <Grid item md={3} sm={6} xs={12}>
              <Card className={classes.root}>
                <CardContent classes={{ root: classes.card }}>
                  <span className={classes.badge} color="textSecondary" gutterBottom>
                    {item.discountPercentage}%
                  </span>
                  <CardMedia
                    className={classes.media}
                    image={item.image}
                    title={item.name}
                  />
                  <Typography variant="h6">
                    {item.name}
                  </Typography>

                  <Grid container container justify="space-between" direction="row" alignItems="center">

                    <Grid item>
                      <Typography variant="h6" color="primary">
                        ₹{item.discountedPrice}/{item.displayWeight}
                      </Typography>
                    </Grid>


                    <Grid item>
                      <QtyController />
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