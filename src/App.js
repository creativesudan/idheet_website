import React from 'react';
import {Header,Footer} from './modules/common'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Home} from './modules/home'
import {ProductListing, Trending, Recommended} from './modules/listing'
import {ProductDetail} from './modules/detail';
import {CheckoutProcess} from './modules/checkout';

function App() {
  return (
    <>
    <Header/>
    <Home/>
    {/* <ProductListing/> */}
    {/* <ProductDetail/> */}
    {/* <Trending/> */}
    // <CheckoutProcess/>
    <Footer/>
    </>
  );
}

export default App;
