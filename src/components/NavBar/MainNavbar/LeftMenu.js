import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import useGetPermissions from "../../../helpers/customHooks/useGetPermissions";
import { useAllowDashboard } from "../../../helpers/customHooks";

const LeftMenu = ({ mode }) => {
  const permissions = useGetPermissions();
  const allowDashboard = useAllowDashboard();
  let { pathname: location } = useLocation();

  /**
   * @param {array<number>} levels
   * @param {React.Component} Component
   * @return {null|React.Component}
   */

  return (
    <Menu mode={mode} selectedKeys={location}>
      <Menu.Item key="/codefeed">
        <NavLink to="/">CodeFeed</NavLink>
      </Menu.Item>
      <Menu.Item key="/tutorials">
        <NavLink to="/">Tutorials</NavLink>
      </Menu.Item>
      {allowDashboard && (
        <Menu.SubMenu title={"User"}>
          <Menu.Item key="my-code-feed">
            <NavLink to="/dashboard/my_feed">My CodeFeed</NavLink>
          </Menu.Item>
        </Menu.SubMenu>
      )}
      {allowDashboard && permissions.length > 0 && (
        <Menu.Item key="/organization">
          <NavLink to="/organization">Organizations</NavLink>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default LeftMenu;
