import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Paper } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { useDispatch, useSelector } from 'react-redux';
import slugify from 'react-slugify';
import { searchBrand, searchCategory, searchProduct, searchReset } from '../../redux/actions/search';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },


}));


export default function Search({ text, setSearchBarVisible }) {
  const classes = useStyles();
  const cmsList = useSelector(state => state.app.cmsList);
  const settings = useSelector(state => state.app.settings);
  const [searchVal, setSearch] = useState("");
  const dispatch = useDispatch();

  const searchResults = useSelector(state => state.search);

  const history = useHistory();
  const [pastSearches, setPastSearches] = useState([]);
  const cart = useSelector(state => state.cart);
  const SEARCH_LEN = 2;

  const _setPastSearches = (newItem) => {
    if (!pastSearches.includes(newItem))
      setPastSearches([newItem, ...pastSearches]);
  }




  const search = (keyword) => {
    // setSearch(keyword);
    if (keyword.length > SEARCH_LEN) {
      dispatch(searchProduct(keyword));
      dispatch(searchCategory(keyword));
      dispatch(searchBrand(keyword));
    }
    if (keyword.length == 0) {
      dispatch(searchReset());
    }

  }

  useEffect(() => {
    try {
      const result = localStorage.getItem('past_searches');

      if (result) {
        console.log("SETTING PAST SEARCHES", result);
        setPastSearches(JSON.parse(result));
      }


    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    console.log("SETTING NEW PAST SEARCHES", pastSearches);
    try {
      localStorage.setItem('past_searches', JSON.stringify(pastSearches));
    } catch (e) {
      console.log(e);
    }
  }, [pastSearches]);

  useEffect(() => {
    search(text);
  }, [text]);

  return (
    <>
      <Paper>

        <List className={classes.root}>
          {searchResults.products && searchResults.products.length > 0 ? searchResults.products.map((product, index) => (
            <>
              <ListItem alignItems="flex-start" button onClick={() => {
                history.push("/product/" + product.id);
                setSearchBarVisible(false);
              }}>
                <ListItemAvatar>
                  <Avatar alt={product.name} src={product.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textSecondary"
                      >
                        {product.category?.category}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {(index < searchResults.products.length - 1) && <Divider variant="inset" component="li" />}
            </>
          ))
            :
            text.length > 2 && <Typography variant="caption" color="textSecondary"><center>{searchResults.error}</center></Typography>
          }


        </List>
      </Paper>
    </>
  );
}
