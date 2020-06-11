import React from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { useAllowDashboard } from "../../helpers/customHooks";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const LeftMenu = ({ mode }) => {
  const allowDashboard = useAllowDashboard();
  return (
    <Menu mode={mode}>
      <Menu.Item key="codefeed">
        <NavLink to="/">CodeFeed</NavLink>
      </Menu.Item>
      <Menu.Item key="tutorials">
        <NavLink to="/">Tutorials</NavLink>
      </Menu.Item>
      {allowDashboard && (
        <SubMenu title={<span>User</span>}>
          <MenuItemGroup title="User Dashboard">
            <Menu.Item key="setting:1">My Tutorials</Menu.Item>
            <Menu.Item key="setting:2">My CodeFeed</Menu.Item>
            <Menu.Item key="setting:3">Followings</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="User Settings">
            <Menu.Item key="setting:4">Profile</Menu.Item>
            <Menu.Item key="setting:5">Password</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default LeftMenu;
