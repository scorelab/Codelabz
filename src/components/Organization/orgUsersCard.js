import React from "react";
import { Card, Menu, Button, Dropdown, Avatar, List, Input } from "antd";
import {
  DownOutlined,
  EditOutlined,
  SafetyOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const permissionLevelIcons = [
  <EditOutlined />,
  <EyeOutlined />,
  <SafetyOutlined />,
];

const data = [
  {
    name: "Nipuna Weerasekara",
    handle: "@niweera",
    image:
      "https://avatars3.githubusercontent.com/u/25348766?s=460&u=7cdc6614a2a9b5e34f50badc1ff19558b3eb5845&v=4",
    permission_level: 0,
  },
  {
    name: "Thisura Seniya Rathnayake",
    handle: "@seniya23",
    image:
      "https://avatars1.githubusercontent.com/u/27486721?s=460&u=4d2d014a63e308fd973f54b675069580f8e007f3&v=4",
    permission_level: 1,
  },
];

const permissionLevelsButton = (item) => {
  return (
    <Menu onClick={(e) => handlePermissionChange({ ...e, ...item })}>
      <Menu.Item key={"perm_0"}>
        <EditOutlined /> Editor
      </Menu.Item>
      <Menu.Item key={"perm_1"}>
        <EyeOutlined /> Reviewer
      </Menu.Item>
      <Menu.Item key={"perm_2"}>
        <SafetyOutlined /> Admin
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item style={{ color: "red" }} key={"perm_3"}>
        <DeleteOutlined /> Remove User
      </Menu.Item>
    </Menu>
  );
};

const handlePermissionChange = (data) => {
  console.log(data);
};

const OrgUsersCard = () => {
  return (
    <Card title="Organization Users" style={{ width: "100%" }}>
      <List
        split={false}
        itemLayout="horizontal"
        className="pt-0"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Dropdown overlay={permissionLevelsButton(item)}>
                <Button style={{ marginRight: "-8px" }}>
                  {permissionLevelIcons[item.permission_level]} <DownOutlined />
                </Button>
              </Dropdown>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={<a href="/user/niweera">{item.name}</a>}
              description={item.handle}
            />
          </List.Item>
        )}
        header={
          <Input.Search
            placeholder="Search users by name or handle"
            onSearch={(value) => console.log(value)}
            style={{ width: "100%", marginTop: "-12px" }}
          />
        }
      />
    </Card>
  );
};

export default OrgUsersCard;
