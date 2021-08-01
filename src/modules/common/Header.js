import React, { useEffect } from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  IconButton, Container, AppBar, Toolbar, Link, Button, Typography, Avatar,
  InputBase, Badge, MenuItem, Menu, ClickAwayListener,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../redux/actions/auth';
import Search from './Search';



import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';



import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { selectDeliveryArea } from '../../redux/actions/app';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    background: '#fff',
    '& header': {
      background: '#fff'
    }
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  logoImg: {
    height: 38,
    [theme.breakpoints.down('sm')]: {
      transform: 'scale(0.8)'
    },
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
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.10),
    },
    marginRight: '0!important',
    marginLeft: '0!important',
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
    background: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
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
    background: '#e6e6e6',
    width: theme.spacing(4),
    height: theme.spacing(4),
    '& svg': {
      width: '0.8em',
      height: '0.8em',
    }
  },
  locationGroup: {
    width: 340,
    maxWidth: '100%',
  },
  searchresult: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    zIndex: '99',
    maxHeight: 350,
    overflow: "auto"
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  mobileSearch: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  desktopSearch: {
    width: '100%',
    paddingRight: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobileMenu: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
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
  const areas = useSelector(state => state.app.areas);
  const selected_area = useSelector(state => state.app.selected_area);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const MenuName = [
    { label: 'Home', navigation: '/' },
    { label: 'Categories', navigation: '/category' },
    { label: 'Brands', navigation: '/brands' },
    { label: 'About Us', navigation: '/about-us' },
    { label: 'Terms & Conditions', navigation: '/terms-conditions' },
    { label: 'Contact Us', navigation: '/contact-us' },
    { label: 'Privacy Policy', navigation: '/privacy-policy' }
  ]
  const extraMenuName = [
    { label: 'Promos', navigation: '/promo' },
    { label: 'My Account', navigation: '/my-account' }
  ]

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {MenuName.map((text, index) => (
          <ListItem button key={text.label} onClick={() => history.push(text.navigation)}>
            <ListItemText primary={text.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {extraMenuName.map((text, index) => (
          <ListItem button key={text.label} onClick={() => history.push(text.navigation)}>
            <ListItemText primary={text.label} />
          </ListItem>
        ))}
        {isAuthenticated ? <ListItem button key={0} onClick={() => dispatch(logout())}>
          <ListItemText primary={"Logout"} />
        </ListItem>
          :
          <ListItem button key={1} onClick={() => history.push("/login")}>
            <ListItemText primary={"Login"} />
          </ListItem>
        }
      </List>
    </div>
  );


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const [value, setValue] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");
  const [searchBarVisible, setSearchBarVisible] = React.useState(false);
  const [mobileSearchBarVisible, setMobileSearchBarVisible] = React.useState(false);

  useEffect(() => {
    if (selected_area && selected_area.area_id) setValue(selected_area?.area_id);
  }, [selected_area]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleAreaSave = (event) => {

    const area = areas?.find(area => area.area_id == value);
    dispatch(selectDeliveryArea(area));
    setOpen(false);

  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>



      <Dialog onClose={handleClose} aria-labelledby="responsive-dialog-title"
        fullScreen={fullScreen} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography variant={'h5'} color={'textPrimary'}>Select Location</Typography>
        </DialogTitle>
        <DialogContent dividers>

          <div className={classes.locationGroup}>
            <FormControl component="fieldset">
              <RadioGroup aria-label="Delhi" name="gender1" value={value.toString()} onChange={handleChange}>
                {areas?.map(area => <FormControlLabel value={area.area_id.toString()} control={<Radio />} label={area.area} />)}

              </RadioGroup>
            </FormControl>
          </div>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button autoFocus onClick={handleAreaSave} color="primary">
            Select
          </Button>
        </DialogActions>
      </Dialog>


      <div className={classes.grow}>
        <AppBar position="static" color="default">
          <Container>
            <Toolbar disableGutters={true}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >

                <div className={classes.mobileMenu}>
                  {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                      <MenuIcon onClick={toggleDrawer(anchor, true)} />
                      <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                      </Drawer>
                    </React.Fragment>
                  ))}
                </div>


              </IconButton>
              <Link href="/"><img src={settings?.app_logo} className={classes.logoImg} /></Link>

              <div className={classes.locationPicker} onClick={handleClickOpen}>

                <Avatar sizes={12} classes={{ colorDefault: classes.locationAvatar }}>
                  <RoomIcon color="action" />
                </Avatar>
                <Typography noWrap="true"> <span style={{ marginLeft: 10, marginRight: 10, fontSize: 12 }}>{selected_area?.area || "Select"}</span></Typography> <ExpandMoreIcon />
              </div>
              <div className={classes.desktopSearch}>
                <ClickAwayListener onClickAway={() => setSearchBarVisible(false)}>
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
                      onChange={e => setSearchText(e.target.value)}
                      // onBlur={() => setSearchText("")}
                      onFocus={() => setSearchBarVisible(true)}
                    />

                    {searchBarVisible ? <div className={classes.searchresult}>
                      <Search text={searchText} setSearchBarVisible={setSearchBarVisible} />
                    </div> : null}
                  </div>
                </ClickAwayListener>
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>



                <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => cart?.totalCount > 0 && history.push("/cart")}>
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
                  <ExitToAppIcon />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => cart?.totalCount > 0 && history.push("/cart")}>
                  <Badge badgeContent={cart?.totalCount} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

              </div>
            </Toolbar>
          </Container>
          <div className={classes.mobileSearch}>
            <ClickAwayListener onClickAway={() => setMobileSearchBarVisible(false)}>
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
                  onChange={e => setSearchText(e.target.value)}
                  // onBlur={() => setSearchText("")}
                  onFocus={() => setMobileSearchBarVisible(true)}
                />

                {mobileSearchBarVisible ? <div className={classes.searchresult}>
                  <Search text={searchText} setSearchBarVisible={setMobileSearchBarVisible} />
                </div> : null}
              </div>
            </ClickAwayListener>
          </div>
          <Toolbar disableGutters={true} variant={"dense"}
            classes={{ root: classes.Toobar }}
          >
            <Container classes={{ root: classes.menuContainer }}>
              <ul className={classes.menu}>
                <li><Link onClick={() => history.push("/")} classes={{ button: classes.menuLink }} component="button" variant="body2" color="textSecondary">Home</Link></li>
                <li><Link onClick={() => history.push("/category")} classes={{ button: classes.menuLink }} component="button" variant="body2" color="textSecondary">Categories</Link></li>
                <li><Link onClick={() => history.push("/brands")} classes={{ button: classes.menuLink }} component="button" variant="body2" color="textSecondary">Brands</Link></li>
                <li><Link onClick={() => history.push("/about-us")} classes={{ button: classes.menuLink }} component="button" variant="body2" color="textSecondary">About Us</Link></li>
                <li><Link onClick={() => history.push("/terms-conditions")} classes={{ button: classes.menuLink }} component="button" variant="body2" color="textSecondary">Terms &amp; Conditions</Link></li>
                <li><Link onClick={() => history.push("/contact-us")} classes={{ button: classes.menuLink }} component="button" variant="body2" color="textSecondary">Contact Us</Link></li>
                <li><Link onClick={() => history.push("/privacy-policy")} classes={{ button: classes.menuLink }} component="button" variant="body2" color="textSecondary">Privacy Policy</Link></li>
                {/* {cmsList?.map(cms => <li><Link onClick={() => history.push("/" + slugify(cms.title))} classes={{ button: classes.menuLink }} component="button" variant="body2" color="textSecondary">{cms.title}</Link></li>)} */}
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

        {renderMenu}
      </div>
    </>
  );
}
