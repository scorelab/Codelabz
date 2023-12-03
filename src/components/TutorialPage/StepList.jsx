import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import {
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Paper,
  Avatar,
  Grid,
  Button
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { HashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  icons: {
    width: "20px",
    height: "20px"
  },

  listIcon: {
    minWidth: "20px"
  },

  paper: {
    display: "flex",
    minWidth: "100%",
    border: "none",
    backgrounColor: "transparent",
    boxShadow: "none"
  },

  navLink: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  menuList: {
    border: "none",
    boxShadow: "none"
  },

  menuItem: {
    width: "100%",
    height: "100%",
    borderRadius: "100px",
    paddingTop: "8px",
    paddingBottom: "3px",
    margin: "3px 0 3px 0"
  },

  notification: {
    color: "#000000"
  },
  customBadge: {
    color: "#ffffff",
    backgroundColor: "#03AAFA"
  }
}));

/**
 * @description - This component renders the side bar menu
 * @returns
 */
const StepList = ({
  menuItems = [],
  value,
  onStateChange = () => {},
  toggleSlider = () => {},
  style,
  children
}) => {
  const classes = useStyles();
  const { id } = useParams();

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
                item.id == location.href.split("#")[1]
                  ? { background: "#d9f1fc", borderRadius: "100px" }
                  : {}
              }
              data-testId={item?.dataTestId}
            >
              {item.id && (
                <HashLink
                  to={`/tutorial/${id}/#${item.id}`}
                  smooth
                  className={classes.navLink}
                >
                  <MenuItem
                    key={item.id}
                    onClick={() => {
                      toggleSlider();
                      onStateChange(index);
                    }}
                    className={classes.menuItem}
                  >
                    {item && (
                      <ListItemIcon className={classes.listIcon}>
                        <Avatar
                          sx={{ height: "1.5rem", width: "1.5rem" }}
                          style={
                            item.id == location.href.split("#")[1]
                              ? {
                                  background: "#0293D9",
                                  borderRadius: "100px",
                                  color: "#fff"
                                }
                              : {}
                          }
                        >
                          {index + 1}
                        </Avatar>
                      </ListItemIcon>
                    )}
                    <ListItemText
                      data-testId={item.title}
                      sx={{ whiteSpace: "pre-line" }}
                      style={{
                        fontWeight:
                          item?.id && value === item?.id ? "bold" : "normal",
                        color:
                          item?.id == location.href.split("#")[1]
                            ? "#0293d9"
                            : "black"
                      }}
                      disableTypography
                    >
                      {item.title}
                    </ListItemText>
                  </MenuItem>
                </HashLink>
              )}
              {!item.link && item.onClick && (
                <MenuItem
                  key={item.title}
                  onClick={() => {
                    if (item.onClick) item.onClick(item);
                    onStateChange(item);
                  }}
                  className={classes.menuItem}
                >
                  <ListItemText
                    data-testId={item.title}
                    style={{
                      fontWeight:
                        item?.id && value === item?.id ? "bold" : "normal",
                      color:
                        item?.link == location.pathname ? "#0293d9" : "black"
                    }}
                    disableTypography
                  >
                    {item.title}
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

export default StepList;
