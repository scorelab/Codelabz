import React from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="codefeed">
        <NavLink to="/">CodeFeed</NavLink>
      </Menu.Item>
      <Menu.Item key="tutorials">
        <NavLink to="/">Tutorials</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
