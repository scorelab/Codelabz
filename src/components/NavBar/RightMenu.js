import React from "react";
import { Menu, Button } from "antd";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../store/actions";
import { useHistory } from "react-router-dom";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import {
  UserOutlined,
  CodeOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const RightMenu = ({ mode }) => {
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
            size="large"
            src={profile.photoURL}
          >
            {acronym}
          </Avatar>
        }
      >
        <Menu.Item key="setting:1">
          <UserOutlined /> My Profile
        </Menu.Item>
        <Menu.Item key="setting:2">
          <CodeOutlined /> My Tutorials
        </Menu.Item>
        <Menu.Item key="setting:3">
          <SettingOutlined /> Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="setting:4" onClick={() => signOut()(firebase, history)}>
          <LogoutOutlined /> Log Out
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
