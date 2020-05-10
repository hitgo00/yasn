import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import MailIcon from "@material-ui/icons/Mail";
import CallSplitIcon from "@material-ui/icons/CallSplit";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
// import PropTypes from "prop-types";

import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GitHubIcon from "@material-ui/icons/GitHub";
import CreateIcon from "@material-ui/icons/Create";
import GestureIcon from "@material-ui/icons/Gesture";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PostAddIcon from "@material-ui/icons/PostAdd";

import { useTheme } from "@material-ui/core/styles";

import DonutSmallIcon from "@material-ui/icons/DonutSmall";

import { Link, Redirect } from "@reach/router";

import { Cookies } from "react-cookie";

const cookies = new Cookies();
const email = cookies.get("userCookie").Email;

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    marginBottom: "4rem",
  },

  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "white",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  link: {
    color: "#292a36",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    marginTop: "2em",
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

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
    cookies.remove("userCookie");
    cookies.remove("userDetails");
    window.location.reload();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
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

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to="/chat" className={classes.link}>
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={"ßeta"} color="secondary">
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
          <ListItem button key={"Projects"}>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary={"Projects"} />
          </ListItem>
        </a>
        {/* </Link> */}

        {/* <Link to="/home/Writings"> */}
        <a href="/home/Writings">
          <ListItem button key={"Writings"}>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary={"Writings"} />
          </ListItem>
        </a>
        {/* </Link> */}

        {/* <Link to="/home/Artwork" onClick={handleTagLink}> */}
        <a href="/home/Artwork">
          <ListItem button key={"Artwork"}>
            <ListItemIcon>
              <GestureIcon />
            </ListItemIcon>
            <ListItemText primary={"Artwork"} />
          </ListItem>
        </a>
        {/* </Link> */}
      </List>
      <Divider />

      <List>
        {/* <Link to="/home/Music"> */}
        <a href="/home/Music">
          <ListItem button key={"Music"}>
            <ListItemIcon>
              <MusicNoteIcon />
            </ListItemIcon>
            <ListItemText primary={"Music"} />
          </ListItem>
        </a>
        {/* </Link> */}

        {/* <Link to="/home/Dance"> */}
        <a href="/home/Dance">
          <ListItem button key={"Dance"}>
            <ListItemIcon>
              <DirectionsWalkIcon />
            </ListItemIcon>
            <ListItemText primary={"Dance"} />
          </ListItem>
        </a>
        {/* </Link> */}

        {/* <Link to="/home/Other"> */}
        <a href="/home/Other">
          <ListItem button key={"Other"}>
            <ListItemIcon>
              <CallSplitIcon />
            </ListItemIcon>
            <ListItemText primary={"Other"} />
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
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link to="/chat">
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={"ßeta"} color="secondary">
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
            anchor={theme.direction === "rtl" ? "right" : "left"}
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
