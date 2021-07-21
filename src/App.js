import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Header, Footer } from './modules/common'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Home } from './modules/home'
import { ProductListing, Trending, Recommended } from './modules/listing'
import { ProductDetail } from './modules/detail';
import { CheckoutProcess } from './modules/checkout';
import { OrderListing, OrderDetail } from './modules/orders';
import { LoginView, OtpView, RegisterView } from './modules/auth';
import { useDispatch } from 'react-redux';
import PrivateRoute from './modules/common/PrivateRoute';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "APP_LOADING" });
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/listing">
            <ProductListing />
          </Route>
          <Route path="/category/:category_id">
            <ProductListing />
          </Route>
          <Route path="/trending">
            <Trending />
          </Route>
          <Route path="/detail">
            <ProductDetail />
          </Route>
          <Route path="/product/:product_id">
            <ProductDetail />
          </Route>
          <Route path="/cart">
            <CheckoutProcess />
          </Route>
          <PrivateRoute path="/orders" component={OrderListing}>

          </PrivateRoute>
          <Route path="/order-detail">
            <OrderDetail />
          </Route>
          <Route path="/login">
            <LoginView />
          </Route>
          <Route path="/otp">
            <OtpView />
          </Route>
          <Route path="/register">
            <RegisterView />
          </Route>
          {/* <Route path="/">
            <Home />
          </Route> */}
          <PrivateRoute path="/" component={Home}></PrivateRoute>
        </Switch>
        <Footer />
      </Router>

    </>
  );
}

export default App;
