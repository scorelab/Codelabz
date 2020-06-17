import React from "react";
import { Menu } from "antd";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../../store/actions";
import { useHistory } from "react-router-dom";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAllowDashboard } from "../../../helpers/customHooks";

const RightMenu = ({ mode }) => {
  const allowDashboard = useAllowDashboard();
  const firebase = useFirebase();
  const history = useHistory();
  const profile = useSelector(({ firebase }) => firebase.profile);
  const acronym =
    (profile.displayName &&
      profile.displayName
        .split(/\s/)
        .reduce((response, word) => (response += word.slice(0, 1)), "")) ||
    null;

  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        title={
          <Avatar
            style={{
              backgroundColor:
                profile.photoURL && profile.photoURL.length > 0
                  ? "#fffff"
                  : "#3AAFA9",
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
          <Menu.Item key="setting:2">
            <CodeOutlined /> My Tutorials
          </Menu.Item>
        )}

        {profile.displayName && profile.displayName.length > 0 && (
          <>
            <Menu.Divider />
            <Menu.ItemGroup title={profile.displayName} />
          </>
        )}

        {allowDashboard && (
          <Menu.Item key="setting:1">
            <UserOutlined /> My Profile
          </Menu.Item>
        )}
        <Menu.Item key="setting:4" onClick={() => signOut()(firebase, history)}>
          <LogoutOutlined /> Log Out
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
