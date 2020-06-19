import React from "react";
import { Menu, Dropdown, Button, Tag, Card } from "antd";
import {
  EllipsisOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { usePalette } from "react-palette";

const OrgMenu = (item) => {
  return (
    <Menu onClick={(e) => console.log({ ...e, ...item })}>
      <Menu.Item key={"setting_edit_org"}>
        <EditOutlined /> Edit Details
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item style={{ color: "red" }} key={"setting_unpublish_org"}>
        <EyeInvisibleOutlined /> Unpublish Organization
      </Menu.Item>
    </Menu>
  );
};

const DropdownMenu = (props) => {
  return (
    <Dropdown key="more" overlay={OrgMenu}>
      <Button
        style={{
          border: "none",
          padding: 0,
        }}
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

const OrgInfoCard = () => {
  const orgs = useSelector(
    ({
      profile: {
        data: { organizations },
      },
    }) => organizations
  );

  const activeOrg = orgs[0]; //Insert logic here to change the active or the displayed organization

  return (
    <Card
      title={
        <>
          {activeOrg.org_name} <Tag color="green">Public</Tag>
        </>
      }
      extra={<DropdownMenu key="more" />}
      style={{ width: "100%" }}
      className="p-0"
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};

export default OrgInfoCard;
