import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import {Header,Footer} from './modules/common'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Home} from './modules/home'
import {ProductListing, Trending, Recommended} from './modules/listing'
import {ProductDetail} from './modules/detail';
import {CheckoutProcess} from './modules/checkout';
import {OrderListing, OrderDetail} from './modules/orders';

function App() {
  return (
    <>
    <Router>
      <Header/>
        <Switch>
          <Route path="/listing">
            <ProductListing/>
          </Route>
          <Route path="/trending">
            <Trending/>
          </Route>
          <Route path="/detail">
            <ProductDetail/>
          </Route>
          <Route path="/cart">
            <CheckoutProcess/>
          </Route>
          <Route path="/orders">
            <OrderListing/>
          </Route>
          <Route path="/order-detail">
            <OrderDetail/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      <Footer/>
    </Router>

    </>
  );
}

export default App;
