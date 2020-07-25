import React from "react";
import { PageHeader, Button, Menu, Dropdown, Space } from "antd";
import {
  SnippetsOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  MessageOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import UserList from "../../Editor/UserList";

const EditControls = ({
  stepPanelVisible,
  isDesktop,
  setMode,
  noteID,
  mode,
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
      title={
        <Space>
          <Button type="primary">
            <PlusOutlined /> Add New Step
          </Button>
          {mode === "edit" && (
            <Button className="ml-24" onClick={() => setMode("view")}>
              <SnippetsOutlined /> Preview
            </Button>
          )}
          {mode === "view" && (
            <Button className="ml-24" onClick={() => setMode("edit")}>
              <EditOutlined /> Edit
            </Button>
          )}

          <Button>
            <EyeInvisibleOutlined /> Hide
          </Button>
          <Button danger>
            <DeleteOutlined /> Remove
          </Button>
        </Space>
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
              className="ml-24"
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
