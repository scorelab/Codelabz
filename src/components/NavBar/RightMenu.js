import React from "react";
import { Menu, Button } from "antd";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../store/actions";
import { useHistory } from "react-router-dom";

const RightMenu = ({ mode }) => {
  const firebase = useFirebase();
  const history = useHistory();

  return (
    <Menu mode={mode}>
      <Menu.Item key="logout">
        <Button type="link" onClick={() => signOut()(firebase, history)}>
          Log out
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export default RightMenu;
