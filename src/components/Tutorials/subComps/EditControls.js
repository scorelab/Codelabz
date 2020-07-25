import React from "react";
import { PageHeader, Button, Menu, Dropdown } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SnippetsOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import UserList from "../../Editor/UserList";

const EditControls = ({
  stepPanelVisible,
  isDesktop,
  tutorialData,
  noteID,
}) => {
  const TutorialMenu = () => {
    return (
      <Menu>
        <Menu.Item
          key={"setting_edit_org"}
          onClick={() => null}
          style={{ color: "red" }}
        >
          <DeleteOutlined /> Move to Trash
        </Menu.Item>
      </Menu>
    );
  };

  const DropdownMenu = () => {
    return (
      <Dropdown key="more" overlay={TutorialMenu}>
        <Button
          style={{
            border: "none",
            padding: 0,
          }}
          type="link"
        >
          <EllipsisOutlined
            style={{
              fontSize: 20,
              verticalAlign: "top",
            }}
          />
        </Button>
      </Dropdown>
    );
  };

  return (
    <PageHeader
      className={
        (!stepPanelVisible && !isDesktop
          ? "ant-page-header-fix "
          : "ant-page-header-unfix ") + "tutorial-title-header low-padding"
      }
      extra={
        !isDesktop && stepPanelVisible ? null : (
          <>
            <UserList noteID={noteID} />
            <Button
              type="text"
              shape="circle"
              icon={<MessageOutlined />}
              size="large"
            />
            <Button type="primary">
              <SnippetsOutlined /> Publish
            </Button>
            <DropdownMenu key="more" />
          </>
        )
      }
    />
  );
};

export default EditControls;
