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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../store/actions";
import { useAllowDashboard } from "../../helpers/customHooks";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  icons: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
  },

  listIcon: {
    minWidth: "20px",
    marginRight:"10px"
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
    borderRadius:"100px",
    paddingTop: "3px",
    paddingBottom: "3px",
    margin: "3px 0 3px 0"
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
              <div key="menu-items"
               style={item.link == location.pathname ?{background:"#d9f1fc",borderRadius:"100px"} :{}}
               >
                {item.link &&
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
                              item?.link== location.pathname? "#0293d9" : "black"
                          }}
                          disableTypography
                        >
                          {item.name}
                        </ListItemText>
                    </MenuItem>
                      </NavLink>
                }
                {!item.link && !item.onClick && (
                  <MenuItem
                    key={item.name}
                    onClick={() => {
                      if (onStateChange !== undefined) 
                        onStateChange(item);

                      toggleSlider();
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
                            item?.link== location.pathname? "#0293d9" : "black"
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
                          item?.link== location.pathname? "#0293d9" : "black"
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
