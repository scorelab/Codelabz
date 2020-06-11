import React, { useState } from "react";
import { Layout, Button, Drawer } from "antd";
import { Link } from "react-router-dom";
import BrandName from "../brandName";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";

function MainNavbar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
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
}

export default MainNavbar;
