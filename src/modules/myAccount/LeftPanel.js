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
  },
  avatar_color_01: {
    backgroundColor: '#ff6000'
  },
  avatar_color_02: {
    backgroundColor: '#92c46d'
  },
  avatar_color_03: {
    backgroundColor: '#007bff'
  },
  avatar_color_04: {
    backgroundColor: '#ffc107'
  },
  avatar_color_05: {
    backgroundColor: '#85a5cc'
  },
  avatar_color_06: {
    backgroundColor: '#3f4eaf'
  }
}))



export default function LeftPanel({ user }) {
  const classes = useStyles();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const history = useHistory();


  const menuList = [
    { label: 'My Account', icon: '', avatarColor: '', link: "/my-account", bgcolor: classes.avatar_color_01 },
    { label: 'Promos / Offers', icon: '', avatarColor: '', link: "/promo", bgcolor: classes.avatar_color_02 },
    { label: 'Orders', icon: '', avatarColor: '', link: "/orders", bgcolor: classes.avatar_color_03 },
    { label: 'My Address', icon: '', avatarColor: '', link: "/address", bgcolor: classes.avatar_color_04 },
    { label: 'Enquiries', icon: '', avatarColor: '', link: "/enquiry", bgcolor: classes.avatar_color_05 },

  ]


  return (
    <>
      <Paper>
        {isAuthenticated && <div className={classes.profileAvtar}>
          {/* <Avatar>V</Avatar> */}
          <Typography variant="h4">Hi, {user?.name}</Typography>
          <Typography variant="subtitle" color="textSecondary">{user?.mobile}</Typography>
        </div>}


        <List className={classes.root}>
          {menuList.map((value, index) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <>
                <Divider />
                <ListItem key={value} button onClick={() => history.push(value.link)}>
                  <ListItemAvatar>
                    <Avatar
                      className={value.bgcolor}
                      alt={value.label[0]}
                      src={`/static/images/avatar/${value + 1}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={`${value.label}`} />
                  <ListItemSecondaryAction>
                    <ChevronRightIcon />
                  </ListItemSecondaryAction>
                </ListItem>
              </>
            );
          })}
        </List>

      </Paper>
    </>
  );
}