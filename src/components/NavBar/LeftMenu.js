import React from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import useGetPermissions from "../../helpers/customHooks/useGetPermissions";
import { useAllowDashboard } from "../../helpers/customHooks";

const LeftMenu = ({ mode }) => {
  const permissions = useGetPermissions();
  const allowDashboard = useAllowDashboard();
  const allowViewOrgComponents = permissions.length > 0;

  /**
   * @param {array<number>} levels
   * @param {React.Component} Component
   * @return {null|React.Component}
   */
  const allowViewOrgSubComponents = (levels, Component) => {
    if (levels.some(e => permissions.includes(e))) return Component;
    return null;
  };

  return (
    <Menu mode={mode}>
      <Menu.Item key="codefeed">
        <NavLink to="/">CodeFeed</NavLink>
      </Menu.Item>
      <Menu.Item key="tutorials">
        <NavLink to="/">Tutorials</NavLink>
      </Menu.Item>
      {allowDashboard && (
        <Menu.SubMenu title={"User"}>
          <Menu.Item key="my-code-feed">
            <NavLink to="/dashboard/my_feed">My CodeFeed</NavLink>
          </Menu.Item>
        </Menu.SubMenu>
      )}
      {allowViewOrgComponents && (
        <Menu.SubMenu title={"Organizations"}>
          {allowViewOrgSubComponents(
            [1, 3],
            <Menu.SubMenu title={"Dashboard"}>
              <Menu.Item key="statistics">
                <NavLink to="/">Statistics</NavLink>
              </Menu.Item>
            </Menu.SubMenu>
          )}
          {allowViewOrgSubComponents(
            [3],
            <Menu.SubMenu title={"Settings"}>
              <Menu.Item key="information">
                <NavLink to="/organization/information">Information</NavLink>
              </Menu.Item>
            </Menu.SubMenu>
          )}
        </Menu.SubMenu>
      )}
    </Menu>
  );
};

export default LeftMenu;
