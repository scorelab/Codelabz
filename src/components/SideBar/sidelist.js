import React from "react";
import { NavLink } from "react-router-dom";
import {
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  icons: {
    width: "20px",
    height: "20px"
  },

  listIcon: {
    minWidth: "30px"
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
  }
}));

const SideList = ({ menuItems, value, onStateChange }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <MenuList className={classes.menuList}>
        {typeof menuItems == "object" &&
          menuItems.map(function (item, index) {
            return (
              <>
                {item.link && (
                  <MenuItem
                    key={item.link}
                    onClick={() => onStateChange(item)}
                    data-testid={item.datatestid}
                  >
                    <NavLink to={item.link} className={classes.navLink}>
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
                            item?.id && value === item?.id ? "bold" : "normal"
                        }}
                        disableTypography
                      >
                        {item.name}
                      </ListItemText>
                    </NavLink>
                  </MenuItem>
                )}
                {!item.link && !item.onClick && (
                  <MenuItem
                    key={item.name}
                    onClick={() => onStateChange(item)}
                    data-testid={item.datatestid}
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
                          item?.id && value === item?.id ? "bold" : "normal"
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
                      item.onClick(item);
                      onStateChange(item);
                    }}
                    data-testid={item.datatestid}
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
                          item?.id && value === item?.id ? "bold" : "normal"
                      }}
                      disableTypography
                    >
                      {item.name}
                    </ListItemText>
                  </MenuItem>
                )}
              </>
            );
          })}
      </MenuList>
    </Paper>
  );
};

export default SideList;
