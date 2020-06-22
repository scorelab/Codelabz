import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown, Menu, Tag } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  EyeInvisibleOutlined
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const OrgMenu = item => {
  return (
    <Menu onClick={e => console.log({ ...e, ...item })}>
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

const DropdownMenu = props => {
  return (
    <Dropdown key="more" overlay={OrgMenu}>
      <Button
        style={{
          border: "none",
          padding: 0
        }}
      >
        <EllipsisOutlined
          style={{
            fontSize: 20,
            verticalAlign: "top"
          }}
        />
      </Button>
    </Dropdown>
  );
};

const OrgInfoCard = () => {
  const [currentOrgData, setCurrentOrgData] = useState({});
  const current = useSelector(
    ({
      org: {
        general: { current }
      }
    }) => current
  );

  const orgs = useSelector(
    ({
      profile: {
        data: { organizations }
      }
    }) => organizations
  );

  useEffect(() => {
    let orgDetails = orgs.find(element => {
      return element.org_handle === current;
    });
    setCurrentOrgData(orgDetails);
  }, [current, orgs]);

  //Insert logic here to change the active or the displayed organization
  return (
    <Card
      title={
        <>
          {currentOrgData.org_name} <Tag color="green">Public</Tag>
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
