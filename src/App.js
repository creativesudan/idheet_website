import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Header, Footer, ContentView } from './modules/common'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Home } from './modules/home'
import { ProductListing, CategoryListing, BrandListing, Trending, Recommended } from './modules/listing'
import { ProductDetail } from './modules/detail';
import { CheckoutProcess } from './modules/checkout';
import { OrderListing, OrderDetail } from './modules/orders';
import { LoginView, OtpView, RegisterView } from './modules/auth';
import MyAccount from './modules/myAccount/MyAccount';
import PromoListView from './modules/myAccount/PromoList';
import EnquiryListView from './modules/myAccount/EnquiryList';
import EnquiryDetailView from './modules/myAccount/EnquiryDetails';
import AddressListView from './modules/myAccount/AddressList';
import PromoDetailView from './modules/myAccount/PromoDetails';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './modules/common/PrivateRoute';
import BrandProductListing from './modules/listing/BrandProductListing';
import ScrollToTop from './modules/common/ScrollToTop';
import Snackbar from './modules/component/Snackbar';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));



function App() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const siteLoading = useSelector(state => state.app.siteLoading);
  const inProgress = useSelector(state => state.app.inProgress);
  useEffect(() => {
    dispatch({ type: "APP_LOADING" });
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  return (
    <>
      <Backdrop className={classes.backdrop} open={siteLoading || inProgress > 0}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Router>
        <ScrollToTop />
        <Snackbar ref={(ref) => Snackbar.setRef(ref)} />
        <Header />
        <Switch>
          <Route path="/listing">
            <ProductListing />
          </Route>
          <Route path="/category/:category_id">
            <ProductListing />
          </Route>
          <Route path="/category">
            <CategoryListing />
          </Route>
          <Route path="/brands/:brand_id">
            <BrandProductListing />
          </Route>
          <Route path="/brands">
            <BrandListing />
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

          <PrivateRoute path="/orders/:order_id" component={OrderDetail} />

          <PrivateRoute path="/orders" component={OrderListing} />
          <Route path="/login">
            <LoginView />
          </Route>
          <Route path="/otp">
            <OtpView />
          </Route>
          <Route path="/register">
            <RegisterView />
          </Route>
          <PrivateRoute path="/enquiry/:enquiry_id" component={EnquiryDetailView} />
          <PrivateRoute path="/enquiry" component={EnquiryListView} />

          <PrivateRoute path="/address" component={AddressListView} />

          <Route path="/enquiry-detail">
            <EnquiryDetailView />
          </Route>

          <Route path="/promo/:promo_id">
            <PromoDetailView />
          </Route>
          <Route path="/promo">
            <PromoListView />
          </Route>






          <PrivateRoute path="/my-account" component={MyAccount}>
          </PrivateRoute>
          <Route path="/" component={Home} exact></Route>
          <Route path={"/:content_slug"} exact>
            <ContentView />
          </Route>
        </Switch>
        <Footer />
      </Router>

    </>
  );
}

export default App;
