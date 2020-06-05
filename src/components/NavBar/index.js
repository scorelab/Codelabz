import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Layout } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

const Navbar = () => {
  let noNavbarPaths = ["/", "/login", "/signup"];

  let location = useLocation().pathname;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (noNavbarPaths.includes(location)) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [location, noNavbarPaths]);

  return (
    <Layout theme="light">
      <Header
        style={{
          position: "fixed",
          zIndex: 99999,
          width: "100%",
        }}
      >
        <div className="logo" />
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
