import React from "react";
import { Menu, Dropdown, Button, PageHeader, Tag } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const menu = (
  <Menu>
    <Menu.Item>1st menu item</Menu.Item>
    <Menu.Item>2nd menu item</Menu.Item>
    <Menu.Item>3rd menu item</Menu.Item>
  </Menu>
);

const DropdownMenu = () => {
  return (
    <Dropdown key="more" overlay={menu}>
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
  return (
    <PageHeader
      title={orgs[0].org_name}
      className="p-0"
      tags={<Tag color="green">Public</Tag>}
      extra={[<DropdownMenu key="more" />]}
    >
      Body content here
    </PageHeader>
  );
};

export default OrgInfoCard;
