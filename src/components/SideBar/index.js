import React, { useEffect, useState } from "react";
import { Drawer, Grid, IconButton, Close, useTheme } from "@material-ui/core";
import SideList from "../SideBar/sidelist";
import Home from "./../../assets/images/home.svg";
import Notification from "./../../assets/images/notification.svg";
import UserSettings from "./../../assets/images/user-settings.svg"
import OrganizationSettings from "./../../assets/images/organization-settings.svg"
import Org from "./../../assets/images/org.svg";
import Profile from "./../../assets/images/profile.svg";
import Bookmark from "./../../assets/images/bookmark.svg";
import Logout from "./../../assets/images/logout.svg";
import Tutorials from "./../../assets/images/tutorial.svg";
import MyFeed from "./../../assets/images/MyFeed.svg";
import { signOut } from "../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import useWindowSize from "../../helpers/customHooks/useWindowSize";
import { useFirebase } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { useAllowDashboard } from "../../helpers/customHooks";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 250,
    flexShrink: 0,
    display: theme.breakpoints.down("md") ? null : "none"
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
  onStateChange,
  children
}) => {
  const windowSize = useWindowSize();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const allowDashboard = useAllowDashboard();

  const defaultMenu = [
    {
      name: "Home",
      img: Home,
      link: "/"
    },
    {
      name: "Notifications",
      img: Notification
    },
    {
      name: "User Settings",
      img: UserSettings,
      link: "/user-dashboard/user-settings"
    },
    {
      name: "Organization Settings",
      img: OrganizationSettings,
      link: "/user-dashboard/organization-settings"
    },
    {
      name: "Organizations",
      img: Org,
      link: "/organization"
    },
    {
      name: "My Feed",
      img: MyFeed,
      link: "/dashboard/my_feed"
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
    (
      allowDashboard &&
      {
      name: "Logout",
      img: Logout,
        onClick: () => signOut()(firebase, dispatch)
      })
  ];

  const classes = useStyles();
  return (
    <>
      {windowSize.width <= 750 ? (
        <Drawer
          closable="true"
          open={open}
          anchor="right"
          onClose={toggleSlider}
          data-testId="drawerMenu"
          style={{ zIndex: 99999 }}
          classes={{
            root: classes.drawer,
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
            style={{
              position: "absolute"
            }}
          >
            {children}
          </SideList>
        </Drawer>
      ) : (
        <div data-testId="normalMenu">
          <SideList
            menuItems={menuItems || defaultMenu}
            value={value}
            onStateChange={onStateChange}
            >
              {children}
            </SideList>
        </div>
      )}
    </>
  );
};

export default SideBar;
