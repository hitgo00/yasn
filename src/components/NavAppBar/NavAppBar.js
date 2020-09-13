import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import MoreIcon from '@material-ui/icons/MoreVert';
import GitHubIcon from '@material-ui/icons/GitHub';
import CreateIcon from '@material-ui/icons/Create';
import GestureIcon from '@material-ui/icons/Gesture';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import { Link } from '@reach/router';
import { Cookies } from 'react-cookie';
import { useStyles } from './styles';
import { useTheme } from '@material-ui/core/styles';

const cookies = new Cookies();

export default function NavAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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

  const handleLogOut = () => {
    setMobileMoreAnchorEl(null);
    cookies.remove('userCookie');
    cookies.remove('userDetails');
    window.location.reload();
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
      <Link to={`/profile`} className={classes.link}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <MenuItem onClick={handleMenuClose} onClick={handleLogOut}>
        Log Out
      </MenuItem>
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
      <Link to="/chat" className={classes.link}>
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={'ßeta'} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
      </Link>
      <Link to="/add" className={classes.link}>
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            {/* <Badge badgeContent={11} color="secondary"> */}
            <PostAddIcon />
            {/* </Badge> */}
          </IconButton>
          <p>Add Post</p>
        </MenuItem>
      </Link>

      <Link to={`/profile`} className={classes.link}>
        <MenuItem onClick={handleMobileMenuClose}>
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
      </Link>
      <MenuItem onClick={handleLogOut}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <p>Log Out</p>
      </MenuItem>
    </Menu>
  );

  const { container } = props;

  const theme = useTheme();

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem>
          <Typography>Browse by Category</Typography>
        </ListItem>
      </List>

      <Divider />
      <List>
        {/* <Link to="/home/Project"> */}
        <a href="/home/Project">
          <ListItem button key={'Projects'}>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary={'Projects'} />
          </ListItem>
        </a>
        {/* </Link> */}

        {/* <Link to="/home/Writings"> */}
        <a href="/home/Writings">
          <ListItem button key={'Writings'}>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary={'Writings'} />
          </ListItem>
        </a>
        {/* </Link> */}

        {/* <Link to="/home/Artwork" onClick={handleTagLink}> */}
        <a href="/home/Artwork">
          <ListItem button key={'Artwork'}>
            <ListItemIcon>
              <GestureIcon />
            </ListItemIcon>
            <ListItemText primary={'Artwork'} />
          </ListItem>
        </a>
        {/* </Link> */}
      </List>
      <Divider />

      <List>
        {/* <Link to="/home/Music"> */}
        <a href="/home/Music">
          <ListItem button key={'Music'}>
            <ListItemIcon>
              <MusicNoteIcon />
            </ListItemIcon>
            <ListItemText primary={'Music'} />
          </ListItem>
        </a>
        {/* </Link> */}

        {/* <Link to="/home/Dance"> */}
        <a href="/home/Dance">
          <ListItem button key={'Dance'}>
            <ListItemIcon>
              <DirectionsWalkIcon />
            </ListItemIcon>
            <ListItemText primary={'Dance'} />
          </ListItem>
        </a>
        {/* </Link> */}

        {/* <Link to="/home/Other"> */}
        <a href="/home/Other">
          <ListItem button key={'Other'}>
            <ListItemIcon>
              <CallSplitIcon />
            </ListItemIcon>
            <ListItemText primary={'Other'} />
          </ListItem>
        </a>
        {/* </Link> */}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.grow}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={handleDrawerToggle}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              // eslint-disable-next-line
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/">
              <IconButton edge="start">
                <DonutSmallIcon />
              </IconButton>
            </Link>
            <Typography className={classes.title} variant="h6" noWrap>
              DA-Connect
            </Typography>
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
              <Link to="/chat">
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={'ßeta'} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Link>
              <Link to="/add">
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  {/* <Badge badgeContent={17} color="secondary"> */}
                  <PostAddIcon />
                  {/* </Badge> */}
                </IconButton>
              </Link>
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
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        {props.children}
        {/* <div className={classes.toolbar} /> */}
      </main>
    </div>
  );
}
