import React, { useState } from "react";
import { Layout, Button, Drawer } from "antd";
import { Link } from "react-router-dom";
import BrandName from "../../../helpers/brandName";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import Headroom from "react-headroom";

function MainNavbar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(!visible);
  };

  return (
    <Headroom style={{ height: "66px" }}>
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
              <Button className="barsMenu" type="link" onClick={showDrawer}>
                <span className="barsBtn"></span>
              </Button>
              <div className="rightMenu">
                <RightMenu mode={"horizontal"} />
              </div>

              <Drawer
                title={
                  <h3 style={{ color: "#3AAFA9" }} className="brand-font">
                    <Link to={"/"}>
                      <BrandName />
                    </Link>
                  </h3>
                }
                placement="right"
                closable={true}
                onClose={showDrawer}
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
    </Headroom>
  );
}

export default MainNavbar;
