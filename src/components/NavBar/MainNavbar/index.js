import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BrandName from "../../../helpers/brandName";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import Headroom from "react-headroom";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

function MainNavbar() {
  const [visible, setVisible] = useState(false);
  let { pathname: location } = useLocation();

  const showDrawer = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    setVisible(false);
  }, [location]);
  const useStyles = makeStyles((theme) => ({
    drawer: {
      width: 250,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 250,
    },
    barsMenu: {
      display: "none",
      [theme.breakpoints.down(767)]: {
        display: "inline-block",
        position: "absolute",
        right: "0",
        top: "1.5rem",
      },
    },
    navHeader: {
      backgroundColor: "white",
      borderBottom: "0",
      padding: "15px 4px 0 24px",
    },
  }));
  const classes = useStyles();
  return (
    <Headroom style={{ height: "66px" }}>
      <nav className="navbar">
        <Grid container>
          <Grid className={classes.navHeader}>
            <div className="logo">
              <h3 style={{ color: "#3AAFA9" }} className="brand-font">
                <Link to={"/"}>
                  <BrandName />
                </Link>
              </h3>
            </div>
            <div className="navbar-menu">
              <div className="leftMenu">
                <LeftMenu mode={"horizontal"} />
              </div>
              <Button
                className={classes.barsMenu}
                type="link"
                onClick={showDrawer}
              >
                <span className="barsBtn"></span>
              </Button>
              <div className="rightMenu">
                <RightMenu mode={"horizontal"} />
              </div>
              <Drawer
                closable="true"
                onClose={showDrawer}
                style={{ zIndex: 99999 }}
                open={visible}
                anchor={"right"}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <h3
                  style={{ color: "#3AAFA9", margin: "1.5rem" }}
                  className="brand-font"
                >
                  <Link to={"/"}>
                    <BrandName />
                  </Link>
                </h3>

                <CloseIcon
                  onClick={showDrawer}
                  style={{ position: "absolute", top: "20px", right: "12px" }}
                ></CloseIcon>
                <LeftMenu mode={"inline"} />
                <RightMenu mode={"inline"} />
              </Drawer>
            </div>
          </Grid>
        </Grid>
      </nav>
    </Headroom>
  );
}

export default MainNavbar;
