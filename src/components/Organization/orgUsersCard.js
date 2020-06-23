import React, { useEffect, useState } from "react";
import {
  Card,
  Menu,
  Button,
  Dropdown,
  Avatar,
  List,
  Input,
  Popover,
  Modal
} from "antd";
import {
  DownOutlined,
  EditOutlined,
  SafetyOutlined,
  EyeOutlined,
  DeleteOutlined,
  SmileOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addOrgUser, getOrgUserData, removeOrgUser } from "../../store/actions";
import { useFirestore } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";
import AddOrgUserModal from "./addOrgUserModal";

const permissionLevelIcons = [
  <EyeOutlined />,
  <EditOutlined />,
  <SafetyOutlined />,
  <SmileOutlined />
];

const permissionLevelTitles = ["Reviewer", "Editor", "Admin", "Owner"];

const OrgUsersCard = () => {
  const data = useSelector(
    ({
      org: {
        user: { data }
      }
    }) => data
  );
  const currentUserHandle = useSelector(
    ({
      firebase: {
        profile: { handle }
      }
    }) => handle
  );
  const currentUserPermission = useSelector(
    ({
      org: {
        general: { permissions }
      }
    }) => permissions
  );
  const currentOrgHandle = useSelector(
    ({
      org: {
        general: { current }
      }
    }) => current
  );

  const firestore = useFirestore();
  const dispatch = useDispatch();
  let userIsAdmin = [2, 3].some(e => currentUserPermission.includes(e));

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  const userProps = useSelector(({ org: { user } }) => user);
  const errorProps = useSelector(
    ({
      org: {
        user: { error }
      }
    }) => error
  );

  useEffect(() => {
    getOrgUserData(currentOrgHandle)(firestore, dispatch);
  }, [currentOrgHandle, firestore, dispatch]);

  useEffect(() => {
    setError(errorProps);
  }, [errorProps]);

  useEffect(() => {
    if (!isLoaded(userProps) && isEmpty(userProps)) {
      setLoading(true);
    }
    if (isLoaded(userProps) && !isEmpty(userProps)) {
      setLoading(false);
    }
    if (isLoaded(userProps) && isEmpty(userProps)) {
      setLoading(false);
    }
  }, [userProps]);

  useEffect(() => {
    if (isLoaded(userProps) && !isEmpty(userProps) && error === false) {
      setViewModal(false);
    }
  }, [userProps, error]);

  const permissionLevelsButton = ({ selected, item }) => {
    return (
      <Menu
        onClick={e => handlePermissionChange({ ...e, ...item })}
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

  const handlePermissionChange = ({ key, permission_level, handle }) => {
    if (key === "remove_user") {
      removeOrgUser({
        org_handle: currentOrgHandle,
        handle
      })(firestore, dispatch);
    } else if (parseInt(key.split("_")[1]) !== permission_level[0]) {
      addOrgUser({
        org_handle: currentOrgHandle,
        handle,
        permissions: parseInt(key.split("_")[1])
      })(firestore, dispatch);
    }
  };

  return (
    <Card
      title="Organization Users"
      style={{ width: "100%" }}
      className="max-height-mobile"
      extra={
        [2, 3].some(e => currentUserPermission.includes(e)) && (
          <Popover content={"Add new user"}>
            <PlusOutlined onClick={() => setViewModal(true)} />
            <Modal
              title={`Add new user [${currentOrgHandle}]`}
              visible={viewModal}
              onOk={() => setViewModal(false)}
              onCancel={() => setViewModal(false)}
              footer={false}
              destroyOnClose={true}
            >
              <AddOrgUserModal currentOrgHandle={currentOrgHandle} />
            </Modal>
          </Popover>
        )
      }
    >
      <List
        split={false}
        itemLayout="horizontal"
        className="pt-0"
        dataSource={data}
        loading={loading}
        renderItem={item => (
          <List.Item
            actions={
              //owner can't change their permissions but can change anyone else's
              //admin can't change owner's and their own permissions but can change others' except owners
              //others can't change anyone's permissions
              item.permission_level[0] === 3
                ? [
                    <Button style={{ marginRight: "-8px" }} disabled>
                      {permissionLevelIcons[item.permission_level[0]]} Owner
                    </Button>
                  ]
                : item.handle === currentUserHandle
                ? [
                    <Button style={{ marginRight: "-8px" }} disabled>
                      {permissionLevelIcons[item.permission_level[0]]}{" "}
                      {permissionLevelTitles[item.permission_level[0]]}
                    </Button>
                  ]
                : userIsAdmin
                ? [
                    <Dropdown
                      overlay={permissionLevelsButton({
                        item,
                        selected: "perm_" + item.permission_level[0]
                      })}
                    >
                      <Button
                        style={{ marginRight: "-8px" }}
                        loading={loading === item.handle}
                        disabled={loading === item.handle}
                      >
                        {permissionLevelIcons[item.permission_level[0]]}{" "}
                        <DownOutlined />
                      </Button>
                    </Dropdown>
                  ]
                : [
                    <Button style={{ marginRight: "-8px" }} disabled>
                      {permissionLevelIcons[item.permission_level[0]]}{" "}
                      {permissionLevelTitles[item.permission_level[0]]}
                    </Button>
                  ]
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={<Link to={`/user/${item.handle}`}>{item.name}</Link>}
              description={`@${item.handle}`}
            />
          </List.Item>
        )}
        header={
          <Input.Search
            placeholder="Search users by name or handle"
            onSearch={value => console.log(value)}
            style={{ width: "100%", marginTop: "-12px" }}
          />
        }
      />
    </Card>
  );
};

export default OrgUsersCard;
