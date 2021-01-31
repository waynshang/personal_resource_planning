import React, { useState, lazy} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import ListItem from '@material-ui/core/ListItem';
// --------- icon ------------------
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EventNoteIcon from '@material-ui/icons/EventNote';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShowChartTwoToneIcon from '@material-ui/icons/ShowChartTwoTone';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';

//------style 
import sidebarStyle from '../css/sidebarStyle'


// -----------------
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import translate from '../en'
import {useAuth} from "./AuthContext"
import { useHistory} from "react-router-dom";

// -----self component
import FormDialog from './Dialog'
import { Dialog } from '@material-ui/core';



function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => (sidebarStyle(theme)));

export default function SideBar({pageComponent}) {
  console.log(pageComponent)
  const classes = useStyles();

  //useState
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState({open: false});
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const {logout, currentUser} = useAuth();

  let history = useHistory();

  const ProfileComponent = lazy(() =>  import('./ProfileUpdate'));


  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleDrawerControl = () => {
    const control = !open
    setOpen(control);
  };

  const url = window.location.pathname.slice(1);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleRedirect = (url) => () => {
    handleMenuClose()
    history.push('/'+url)
  }

  const handleOpenDialog = (type) => () => {
    const data  = {};
    switch (type){
      case 'profile':
        data["open"] = true
        // data["title"] = "Update Profile"
        // data["text"] = "Please update your basic personal info"
        data["Component"] = ProfileComponent
    }
    setDialogData(data)
    handleMenuClose()
  }
  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  async function handleLogOut(){
  
    try{
      setError('')
      setLoading(true)
      const result = await logout()
      setLoading(false)
      history.push('/logIn')
    } catch (error){
      setError(error["message"])
    }
    setLoading(false)
  }

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
      <MenuItem onClick={handleOpenDialog('profile')}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogOut}>Log out</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HideOnScroll >
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerControl}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {translate(url) || ""}
            </Typography>
            {/* ----------------------- upper left icon ------------------------ */}
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
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
          {renderMenu}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        
        <div className={classes.drawerHeader} style ={{display: "flex", justifyContent: "center"}}>
          <Typography variant="h6" noWrap >
            {currentUser.displayName || "Please Update Profile"}
          </Typography>
        </div>
        <Divider />
        <List>
     
            <ListItem button key={"Product TimeLine List"} onClick={handleRedirect("ProductTimeLinePage")}>
              <ListItemIcon><EventNoteIcon /></ListItemIcon>
              <ListItemText primary={"Product TimeLine List"} />
            </ListItem>

            <ListItem button key={"Stock List"}>
              <ListItemIcon><ShowChartTwoToneIcon /></ListItemIcon>
              <ListItemText primary={"Stock List"} />
            </ListItem>

            <ListItem button key={"Wealth List"}>
              <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
              <ListItemText primary={"Wealth List"} />
            </ListItem>

            <ListItem button key={"Physic Management"}>
              <ListItemIcon><AccessibilityNewIcon /></ListItemIcon>
              <ListItemText primary={"Physic Management"} />
            </ListItem>

        </List>
      </Drawer>

      {dialogData.open && <FormDialog data = {dialogData} handleMenuClose ={handleMenuClose}/>}
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {pageComponent}
      </main>
      
    </div>
  );
}
