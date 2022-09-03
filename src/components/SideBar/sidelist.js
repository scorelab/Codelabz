import React from "react";
import { NavLink, useHistory } from "react-router-dom";
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

const SideList = ({
  menuItems,
  value,
  onStateChange = () => {},
  toggleSlider = () => {},
  style
}) => {
  const classes = useStyles();
  const allowDashboard = useAllowDashboard();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Paper className={classes.paper} style={style}>
      <MenuList className={classes.menuList}>
        {typeof menuItems == "object" &&
          menuItems.map(function (item, index) {
            return (
              <div key="menu-items">
                {item.link &&
                  ((allowDashboard && item.name === "Profile") ||
                    item.name !== "Profile") && (
                    <MenuItem
                      key={item.link}
                      onClick={() => {
                        toggleSlider();
                        onStateChange(index);
                      }}
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
                    onClick={() => {
                      onStateChange(item);
                      toggleSlider();
                    }}
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
                {!item.link && item.onClick && item.name !== "Logout" && (
                  <MenuItem
                    key={item.name}
                    onClick={() => {
                      if (item.onClick) item.onClick(item);
                      onStateChange(item);
                    }}
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
                {item.name === "Logout" && allowDashboard && (
                  <MenuItem
                    key={item.name}
                    onClick={() => {
                      signOut()(firebase, dispatch);
                      toggleSlider();
                    }}
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
              </div>
            );
          })}
        {!allowDashboard && window.innerWidth <= 750 && (
          <>
            {" "}
            <Grid
              item
              style={{
                padding: 10
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{
                  boxShadow: "none",
                  color: "white"
                }}
                className={classes.button}
                onClick={() => {
                  history.push("/login");
                }}
              >
                Login
              </Button>
            </Grid>
            <Grid
              item
              style={{
                padding: 10
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                style={{
                  boxShadow: "none"
                }}
                className={classes.button}
                onClick={() => {
                  history.push("/signup");
                }}
              >
                Sign Up
              </Button>
            </Grid>
          </>
        )}
      </MenuList>
    </Paper>
  );
};

export default SideList;
