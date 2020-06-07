import React, { useState, useEffect } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button, Layout } from "antd";
import { Link, useLocation } from "react-router-dom";
import BrandName from "../brandName";

const Navbar = () => {
  let noNavbarPaths = [
    "/",
    "/login",
    "/signup",
    "/forgotpassword",
    "/manageusers"
  ];
  let { pathname: location } = useLocation();
  const [render, setRender] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (noNavbarPaths.includes(location)) {
      setRender(false);
    } else {
      setRender(true);
    }
  }, [location, noNavbarPaths]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  if (render) {
    return (
      <nav className="navbar">
        <Layout>
          <Layout.Header className="nav-header">
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
              <div className="rightMenu">
                <RightMenu mode={"horizontal"} />
              </div>
              <Button className="barsMenu" type="link" onClick={showDrawer}>
                <span className="barsBtn"></span>
              </Button>
              <Drawer
                title={
                  <h3 style={{ color: "#3AAFA9" }} className="brand-font">
                    <Link to={"/"}>
                      <BrandName />
                    </Link>
                  </h3>
                }
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                style={{ zIndex: 99999 }}
              >
                <LeftMenu mode={"inline"} />
                <RightMenu mode={"inline"} />
              </Drawer>
            </div>
          </Layout.Header>
        </Layout>
      </nav>
    );
  } else {
    return null;
  }
};

export default Navbar;
