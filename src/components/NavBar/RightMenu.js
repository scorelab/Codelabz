import React from "react";
import { Menu } from "antd";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../store/actions";
import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  CodeOutlined,
  SettingOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { useAllowDashboard } from "../../helpers/customHooks";

const RightMenu = ({ mode }) => {
  const allowDashboard = useAllowDashboard();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const profile = useSelector(({ firebase }) => firebase.profile);
  const acronym =
    (profile.displayName &&
      profile.displayName
        .split(/\s/)
        .reduce((response, word) => (response += word.slice(0, 1)), "")) ||
    null;
  const organizations = useSelector(
    ({
      profile: {
        data: { organizations }
      }
    }) => organizations
  );

  const allowOrgs = organizations && organizations.length > 0;

  const orgList =
    allowOrgs > 0
      ? organizations.map((org, i) => {
          return (
            <Menu.Item key={`org:${i}`}>
              <CodeOutlined /> {org.org_name}
            </Menu.Item>
          );
        })
      : null;

  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        title={
          <Avatar
            style={{
              backgroundColor:
                profile.photoURL && profile.photoURL.length > 0
                  ? "#fffff"
                  : "#3AAFA9"
            }}
            size={mode === "inline" ? "default" : "large"}
            src={profile.photoURL}
            icon={
              acronym ? null : (
                <UserOutlined
                  style={{ fontSize: mode === "inline" ? "1rem" : "1.4rem" }}
                />
              )
            }
          >
            {acronym}
          </Avatar>
        }
      >
        {allowDashboard && (
          <Menu.Item key="setting:1">
            <UserOutlined /> My Profile
          </Menu.Item>
        )}
        {allowDashboard && allowOrgs && (
          <Menu.SubMenu title={"My Organizations"}>{orgList}</Menu.SubMenu>
        )}

        {allowDashboard && (
          <Menu.Item key="setting:3">
            <SettingOutlined /> Settings
          </Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Item
          key="setting:4"
          onClick={() => signOut()(firebase, dispatch)}
        >
          <LogoutOutlined /> Log Out
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
