import React from "react";
import { Menu, Button } from "antd";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../store/actions";

const RightMenu = ({ mode }) => {
  const firebase = useFirebase();

  return (
    <Menu mode={mode}>
      <Menu.Item key="logout">
        <Button type="link" onClick={() => signOut()(firebase)}>
          Log out
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export default RightMenu;
