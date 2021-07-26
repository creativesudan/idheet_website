import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button } from '@material-ui/core';
import { PromoSlider, BrandSlider, CategorySlider, HotProducts, RecommendedProducts } from './index'
import { HeadingBar } from '../component/index'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppSettings } from '../../redux/actions/app';
import { fetchExclusiveProducts, fetchOtherProducts, fetchPopularProducts, fetchRecommendedProducts } from '../../redux/actions/home';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  sectionGap: {
    margin: theme.spacing(6, 0)
  }
}))

export default function Home() {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.app.settings);
  const exclusiveProducts = useSelector(state => state.home.exclusiveProducts || []);
  const popularProducts = useSelector(state => state.home.popularProducts || []);
  const recommendedProducts = useSelector(state => state.home.recommendedProducts || []);
  const otherProducts = useSelector(state => state.home.otherProducts || []);
  const categories = useSelector(state => state.home.categories?.filter(item => item.show_on_home && !item.parent).sort((a, b) => (a.rank || 0) - (b.rank || 0)));
  const history = useHistory();



  useEffect(() => {
    dispatch(fetchAppSettings());
    dispatch(fetchExclusiveProducts());
    dispatch(fetchPopularProducts());
    dispatch(fetchRecommendedProducts());
    dispatch(fetchOtherProducts());
  }, []);



  const classes = useStyles();
  return (
    <>
      <Container>
        <div className={classes.sectionGap}>
          <CategorySlider categories={categories} onClick={(category) => history.push("/category/" + category.id)} title="What are you looking for?" />
          <PromoSlider />
          <HotProducts title={settings && settings.home_section1} products={exclusiveProducts} />
          <HotProducts title={settings && settings.home_section2} products={popularProducts} />
          <HotProducts title={settings && settings.home_section3} products={otherProducts} />
          <RecommendedProducts title={settings && settings.home_section4} products={recommendedProducts} />
          <BrandSlider />
        </div>
      </Container>
    </>
  );
}
