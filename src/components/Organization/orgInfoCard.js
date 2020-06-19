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

  const activeOrg = orgs[0]; //Insert logic here to change the active or the displayed organization

  return (
    <PageHeader
      title={activeOrg.org_name}
      className="p-0"
      tags={<Tag color="green">Public</Tag>}
      extra={[<DropdownMenu key="more" />]}
      subTitle={"@" + activeOrg.org_handle}
    ></PageHeader>
  );
};

export default OrgInfoCard;
