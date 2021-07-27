import React, { useState } from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Breadcrumbs, Link, Typography, Paper, Grid, Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  profileAvtar: {
    textAlign: 'center',
    padding: '20px 0'
  }
}))


const menuList = [
  { label: 'My Account', icon: '', avatarColor: '', link: "/my-account" },
  { label: 'Promos / Offers', icon: '', avatarColor: '', link: "/promo" },
  { label: 'Orders', icon: '', avatarColor: '', link: "/orders" },
  { label: 'My Address', icon: '', avatarColor: '', link: "/address" },
  { label: 'Enquiries', icon: '', avatarColor: '', link: "" },
  { label: 'Logout', icon: '', avatarColor: '', link: "" }
]


export default function LeftPanel({ user }) {
  const classes = useStyles();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const history = useHistory();



  return (
    <>
      <Paper>
        {isAuthenticated && <div className={classes.profileAvtar}>
          {/* <Avatar>V</Avatar> */}
          <Typography variant="h4">Hi, {user?.name}</Typography>
          <Typography variant="subtitle" color="textSecondary">{user?.mobile}</Typography>
        </div>}


        <List dense className={classes.root}>
          {menuList.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <>
                <ListItem key={value} button onClick={() => history.push(value.link)}>
                  <ListItemAvatar>
                    <Avatar
                      alt={value.label[0]}
                      src={`/static/images/avatar/${value + 1}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={`${value.label}`} />
                  <ListItemSecondaryAction>
                    <ChevronRightIcon />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </>
            );
          })}
        </List>

      </Paper>
    </>
  );
}