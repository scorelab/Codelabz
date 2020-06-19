import React, { useState } from "react";
import {
  Card,
  Menu,
  Button,
  Dropdown,
  Avatar,
  List,
  Input,
  message,
} from "antd";
import {
  DownOutlined,
  EditOutlined,
  SafetyOutlined,
  EyeOutlined,
  DeleteOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const permissionLevelIcons = [
  <EyeOutlined />,
  <EditOutlined />,
  <SafetyOutlined />,
  <SmileOutlined />,
];

const data = [
  {
    name: "Nipuna Weerasekara",
    handle: "@niweera",
    image:
      "https://avatars3.githubusercontent.com/u/25348766?s=460&u=7cdc6614a2a9b5e34f50badc1ff19558b3eb5845&v=4",
    permission_level: 3,
  },
  {
    name: "Nipuna Weerasekara",
    handle: "@faceookniweera",
    image:
      "https://avatars3.githubusercontent.com/u/25348766?s=460&u=7cdc6614a2a9b5e34f50badc1ff19558b3eb5845&v=4",
    permission_level: 2,
  },
  {
    name: "Thisura Seniya Rathnayake",
    handle: "@seniya23",
    image:
      "https://avatars1.githubusercontent.com/u/27486721?s=460&u=4d2d014a63e308fd973f54b675069580f8e007f3&v=4",
    permission_level: 1,
  },
  {
    name: "Thisura Seniya Rathnayake",
    handle: "@seniya351",
    image:
      "https://avatars1.githubusercontent.com/u/27486721?s=460&u=4d2d014a63e308fd973f54b675069580f8e007f3&v=4",
    permission_level: 0,
  },
];

const OrgUsersCard = () => {
  let userIsAdmin = true; //current user's permission level on this organization

  const [loading, setLoading] = useState(null);

  const permissionLevelsButton = ({ selected, item }) => {
    return (
      <Menu
        onClick={(e) => handlePermissionChange({ ...e, ...item })}
        selectedKeys={selected}
      >
        <Menu.Item key={"perm_0"}>
          <EyeOutlined /> Reviewer
        </Menu.Item>
        <Menu.Item key={"perm_1"}>
          <EditOutlined /> Editor
        </Menu.Item>
        <Menu.Item key={"perm_2"}>
          <SafetyOutlined /> Admin
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item style={{ color: "red" }} key={"remove_user"}>
          <DeleteOutlined /> Remove User
        </Menu.Item>
      </Menu>
    );
  };

  const handlePermissionChange = (data) => {
    console.log(data);
    setLoading(data.handle);
    setTimeout(() => {
      setLoading(null);
      message.success("Changes saved!");
      message.error("An error occured. Please try again later.");
    }, 1000);
  };

  return (
    <Card
      title="Organization Users"
      style={{ width: "100%" }}
      className="max-height-mobile"
    >
      <List
        split={false}
        itemLayout="horizontal"
        className="pt-0"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={
              userIsAdmin && item.permission_level !== 3
                ? [
                    <Dropdown
                      overlay={permissionLevelsButton({
                        item,
                        selected: "perm_" + item.permission_level,
                      })}
                    >
                      <Button
                        style={{ marginRight: "-8px" }}
                        loading={loading === item.handle}
                        disabled={loading === item.handle}
                      >
                        {permissionLevelIcons[item.permission_level]}{" "}
                        <DownOutlined />
                      </Button>
                    </Dropdown>,
                  ]
                : [
                    <Button style={{ marginRight: "-8px" }} disabled>
                      {item.permission_level === 3 ? (
                        <>{permissionLevelIcons[item.permission_level]} Owner</>
                      ) : (
                        permissionLevelIcons[item.permission_level]
                      )}
                    </Button>,
                  ]
            }
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
