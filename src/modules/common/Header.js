import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  IconButton, Container, AppBar, Toolbar, Link, Button, Typography, Avatar,
  InputBase, Badge, MenuItem, Menu,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import slugify from 'react-slugify';
import { logout } from '../../redux/actions/auth';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    background: '#fff',
    '& header': {
      background: '#fff'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  locationPicker: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing(2),
    minWidth: 160,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.10),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  Toobar: {
    background: '#70c584'
  },
  menu: {
    margin: 0, padding: 0, marginLeft: theme.spacing(-2), flex: 1,
    '& li': {
      display: 'inline-block',
      margin: theme.spacing(1, 2),
      color: '#fff'
    },
  },
  menuLink: {
    color: '#fff', fontSize: 16
  },
  menuContainer: {
    display: 'flex'
  },
  locationAvatar: {
    background: '#ddd'
  }
}));

export default function Header() {
  const settings = useSelector(state => state.app.settings);
  const cart = useSelector(state => state.cart);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const cmsList = useSelector(state => state.app.cmsList);
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthenticated && <><MenuItem onClick={() => history.push("/my-account")}>My Account</MenuItem>
        <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
      </>}

      {!isAuthenticated && <MenuItem onClick={() => history.push("/login")}>Login / Register</MenuItem>}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 8 new mails" color="inherit">
          <Badge badgeContent={8} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      {/* <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="default">
        <Container>
          <Toolbar disableGutters={true}>
            {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
            <img src={settings?.app_logo} style={{ height: 38 }} />
            <div className={classes.locationPicker}>

              <Avatar classes={{ colorDefault: classes.locationAvatar }}>
                <RoomIcon color="action" />
              </Avatar>
              <span style={{ marginLeft: 10, marginRight: 10 }}>New delhi</span> <ExpandMoreIcon />
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>



              <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => history.push("/cart")}>
                <Badge badgeContent={cart?.totalCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
        <Toolbar disableGutters={true} variant={"dense"}
          classes={{ root: classes.Toobar }}
        >
          <Container classes={{ root: classes.menuContainer }}>
            <ul className={classes.menu}>
              {cmsList?.map(cms => <li><Link onClick={() => history.push("/" + slugify(cms.title))} classes={{ button: classes.menuLink }} component="button" variant="body2" color="textSecondary">{cms.title}</Link></li>)}
              {/* <li><Link classes={{ button: classes.menuLink }} component="button" variant="body2" color="textSecondary">Home</Link></li>
              <li><Link classes={{ button: classes.menuLink }} component="button" variant="body2" color="textSecondary">Home</Link></li>
              <li><Link classes={{ button: classes.menuLink }} component="button" variant="body2" color="textSecondary">Home</Link></li>
              <li><Link classes={{ button: classes.menuLink }} component="button" variant="body2" color="textSecondary">Home</Link></li> */}
            </ul>
            {/* <Button color="primary" variant="contained" disableElevation onClick={() => history.push("/trending")}>Trending</Button> */}
            <Button color="secondary" variant="contained" disableElevation onClick={() => history.push("/promo")}>
              <LocalOfferIcon fontSize="small" />&nbsp;Promos</Button>
          </Container>
        </Toolbar >
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
