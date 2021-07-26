import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import {Link} from "react-router-dom";
import { Button, Breadcrumbs, TextField, Divider, Fab, Box, Grid, Container, Typography, Link } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import slugify from 'react-slugify';


const useStyles = makeStyles((theme) => ({
  sectionGap: {
    margin: theme.spacing(6, 0)
  },
  BreadcrumbsContainer: {
    padding: '20px 0',
    background: '#e9ecef'
  },
}));

export function FooterLinks(props) {
  return (
    <Box component="span" display="block" py={0.2}>
      <Link href={props.link} variant="caption" color="textSecondary">{props.label}</Link>
    </Box>
  )
}

export default function ContentView() {
  const classes = useStyles();
  const { content_slug } = useParams();
  const dispatch = useDispatch();
  const cmsList = useSelector(state => state.app.cmsList);
  const [page, setPage] = React.useState(null);

  useEffect(() => {
    if (content_slug) {
      setPage(cmsList?.find(cms => content_slug == slugify(cms.title)));
    }
  }, [content_slug, cmsList]);


  return (
    <>

      <div className={classes.BreadcrumbsContainer}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" href="/">
              Home
            </Link>
            <Typography color="textPrimary">{page?.title}</Typography>
          </Breadcrumbs>
        </Container>
      </div>
      <Container>
        <div className={classes.sectionGap}>
          <Typography dangerouslySetInnerHTML={{ __html: page?.description }}>
            {/* {page?.description} */}
          </Typography>
        </div>
      </Container>
    </>
  );
}
