import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import {
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Paper,
  Grid,
  Button
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";

// redesign useStyle sideList
const useStyles = makeStyles(theme => ({
  icons: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#87CEFA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontSize: "14px"
  },

  listIcon: {
    minWidth: "20px",
    marginRight: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  paper: {
    display: "flex",
    minWidth: "100%",
    border: "none",
    backgroundColor: "transparent",
    boxShadow: "none",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px"
  },

  navLink: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textDecoration: "none",
    color: "#ffffff",
    fontWeight: "bold",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      color: "#87CEFA",
    }
  },

  menuList: {
    border: "none",
    boxShadow: "none",
    padding: "0"
  },

  menuItem: {
    width: "100%",
    height: "100%",
    borderRadius: "100px",
    paddingTop: "8px",
    paddingBottom: "3px",
    margin: "3px 0 3px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "#87CEFA",
    }
  },

  notification: {
    color: "#000000",
    marginRight: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    "&::after": {
      content: "''",
      position: "absolute",
      top: "0",
      right: "0",
      backgroundColor: "#87CEFA",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      border: "2px solid #ffffff"
    }
  },

  customBadge: {
    color: "#ffffff",
    backgroundColor: "#87CEFA",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px"
  }
}));


/**
 * @description - This component renders the side bar menu
 * @returns
 */
const SideList = ({
  menuItems = [],
  value,
  onStateChange = () => {},
  toggleSlider = () => {},
  style,
  children
}) => {
  const classes = useStyles();
  const location = useLocation();
  const notification = 10;

  /**
   * * Cases for rendering the menu items
   *
   * ? 1. item.link - If the item has a link, render a NavLink
   * ? 2. item.onClick - If the item has an onClick, render a button
   * ? if the item has neither, render a MenuItem with no onClick
   *
   */
  return (
    <Paper className={classes.paper} style={style}>
      <MenuList className={classes.menuList}>
        {menuItems.map(function (item, index) {
          return (
            <div
              key="menu-items"
              style={
                item.link == location.pathname
                  ? { background: "#d9f1fc", borderRadius: "100px" }
                  : {}
              }
              data-testId={item?.dataTestId}
            >
              {item.link && (
                <NavLink to={item.link} className={classes.navLink}>
                  <MenuItem
                    key={item.link}
                    onClick={() => {
                      toggleSlider();
                      onStateChange(index);
                    }}
                    className={classes.menuItem}
                  >
                    {item.img && (
                      <ListItemIcon className={classes.listIcon}>
                        <img
                          alt={"..."}
                          src={item.img}
                          className={classes.icons}
                        />
                      </ListItemIcon>
                    )}
                    <ListItemText
                      data-testId={item.name}
                      style={{
                        fontWeight:
                          item?.id && value === item?.id ? "bold" : "normal",
                        color:
                          item?.link == location.pathname ? "#0293d9" : "black"
                      }}
                      disableTypography
                    >
                      {item.name}
                    </ListItemText>
                  </MenuItem>
                </NavLink>
              )}
              {!item.link && !item.onClick && (
                <MenuItem
                  key={item.name}
                  onClick={() => {
                    if (onStateChange !== undefined) onStateChange(item);

                    toggleSlider();
                  }}
                  className={classes.menuItem}
                >
                  {item.img && (
                    <ListItemIcon className={classes.listIcon}>
                      <Badge
                        badgeContent={
                          notification &&
                          (notification > 99 ? "99+" : notification)
                        }
                        color="primary"
                        classes={{ badge: classes.customBadge }}
                      >
                        <NotificationsIcon className={classes.notification} />
                      </Badge>
                    </ListItemIcon>
                  )}
                  <ListItemText
                    data-testId={item.name}
                    style={{
                      fontWeight:
                        item?.id && value === item?.id ? "bold" : "normal",
                      color:
                        item?.link == location.pathname ? "#0293d9" : "black"
                    }}
                    disableTypography
                  >
                    {item.name}
                  </ListItemText>
                </MenuItem>
              )}
              {!item.link && item.onClick && (
                <MenuItem
                  key={item.name}
                  onClick={() => {
                    if (item.onClick) item.onClick(item);
                    onStateChange(item);
                  }}
                  className={classes.menuItem}
                >
                  {item.img && (
                    <ListItemIcon className={classes.listIcon}>
                      <img
                        alt={"..."}
                        src={item.img}
                        className={classes.icons}
                      />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    data-testId={item.name}
                    style={{
                      fontWeight:
                        item?.id && value === item?.id ? "bold" : "normal",
                      color:
                        item?.link == location.pathname ? "#0293d9" : "black"
                    }}
                    disableTypography
                  >
                    {item.name}
                  </ListItemText>
                </MenuItem>
              )}
            </div>
          );
        })}
        {children}
      </MenuList>
    </Paper>
  );
};

export default SideList;
