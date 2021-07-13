import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container,Button} from '@material-ui/core';
import {PromoSlider,CategorySlider,HotProducts,RecommendedProducts} from './index'
import {HeadingBar} from '../component/index'

const useStyles = makeStyles((theme) => ({
  sectionGap:{
    margin: theme.spacing(6, 0)
  }
}))

export default function Home() {
  const classes = useStyles();
  return (
    <>
    <Container>
      <div className={classes.sectionGap}>
        <CategorySlider/>
        <PromoSlider/>
        <HotProducts/>
        <RecommendedProducts/>
      </div>
    </Container>
    </>
  );
}
