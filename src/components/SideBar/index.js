import React, { useState } from "react";
import { Drawer } from "@material-ui/core";
import SideList from "../SideBar/sidelist";
import Home from "./../../assets/images/home.svg";
import Notification from "./../../assets/images/notification.svg";
import Setting from "./../../assets/images/setting.svg";
import Org from "./../../assets/images/org.svg";
import Profile from "./../../assets/images/profile.svg";
import Bookmark from "./../../assets/images/bookmark.svg";

const SideBar = ({
  open,
  toggleSlider,
  notification,
  menuItems,
  value,
  onStateChange,
}) => {
  const defaultMenu = [
    {
      name: "Home",
      img: Home,
      link: "/",
    },
    {
      name: "Notifications",
      img: Notification,
      onClick: `${notification}`,
    },
    {
      name: "Settings",
      img: Setting,
      link: "/settings",
    },
    {
      name: "Organizations",
      img: Org,
      link: "/organizations",
    },
    {
      name: "Profile",
      img: Profile,
      link: "/profile",
    },
    {
      name: "Bookmarks",
      img: Bookmark,
      link: "/bookmarks",
    },
  ];

  console.log(menuItems);
  return (
    <>
      {window.innerWidth <= 750 && (
        <Drawer
          open={open}
          anchor="right"
          onClose={toggleSlider}
          data-testId="drawerMenu">
          <SideList
            menuItems={menuItems ? menuItems : defaultMenu}
            value={value}
            onStateChange={onStateChange}
          />
        </Drawer>
      )}

      {window.innerWidth > 750 && (
        <div data-testId="normalMenu">
          <SideList
            menuItems={menuItems ? menuItems : defaultMenu}
            value={value}
            onStateChange={onStateChange}
          />
        </div>
      )}
    </>
  );
};

export default SideBar;
