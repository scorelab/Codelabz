import React, { useState } from "react";
import { Drawer, Grid, IconButton, Close } from "@material-ui/core";
import SideList from "../SideBar/sidelist";
import Home from "./../../assets/images/home.svg";
import Notification from "./../../assets/images/notification.svg";
import Setting from "./../../assets/images/setting.svg";
import Org from "./../../assets/images/org.svg";
import Profile from "./../../assets/images/profile.svg";
import Bookmark from "./../../assets/images/bookmark.svg";
import Logout from "./../../assets/images/logout.svg";
import Tutorials from "./../../assets/images/tutorial.svg";
import { signOut } from "../../store/actions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 250,
    flexShrink: 0
  },
  drawerPaper: {
    width: 250
  }
}));

const SideBar = ({
  open,
  toggleSlider,
  notification,
  menuItems,
  value,
  onStateChange
}) => {
  const defaultMenu = [
    {
      name: "Home",
      img: Home,
      link: "/"
    },
    {
      name: "Notifications",
      img: Notification,
      onClick: `${notification}`
    },
    {
      name: "Settings",
      img: Setting,
      link: "/settings"
    },
    {
      name: "Organizations",
      img: Org,
      link: "/organization"
    },
    {
      name: "Profile",
      img: Profile,
      link: "/profile"
    },
    {
      name: "Bookmarks",
      img: Bookmark,
      link: "/bookmarks"
    },
    {
      name: "Tutorials",
      img: Tutorials,
      link: "/tutorials"
    },
    {
      name: "Logout",
      img: Logout,
      onClick: `${signOut}`
    }
  ];
  const classes = useStyles();
  return (
    <>
      {window.innerWidth <= 750 && (
        <Drawer
          closable="true"
          open={open}
          anchor="right"
          onClose={toggleSlider}
          data-testId="drawerMenu"
          style={{ zIndex: 99999 }}
          classes={{
            paper: classes.drawerPaper
          }}
          xs={12}
          md={3}
        >
          <SideList
            menuItems={menuItems || defaultMenu}
            value={value}
            onStateChange={onStateChange}
            toggleSlider={toggleSlider}
          />
        </Drawer>
      )}

      {window.innerWidth > 750 && (
        <div data-testId="normalMenu">
          <SideList
            menuItems={menuItems || defaultMenu}
            value={value}
            onStateChange={onStateChange}
          />
        </div>
      )}
    </>
  );
};

export default SideBar;
