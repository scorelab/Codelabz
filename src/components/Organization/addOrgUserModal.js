import React, { useEffect, useState } from "react";
import { Form, Input, Menu, Dropdown, Button } from "antd";
import {
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { addOrgUser, checkUserHandleExists } from "../../store/actions";
import {
  isEmpty,
  isLoaded,
  useFirebase,
  useFirestore,
} from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

const AddOrgUserModal = ({ currentOrgHandle }) => {
  const currentUser = useSelector(
    ({
      firebase: {
        profile: { handle },
      },
    }) => handle
  );
  const currentOrgUsers = useSelector(
    ({
      org: {
        user: { data },
      },
    }) => data
  );
  const userProps = useSelector(({ org: { user } }) => user);
  const [loading, setLoading] = useState(false);
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [selected, setSelected] = useState("perm_0");
  const permissionLevelIcons = [
    <>
      <EyeOutlined className="mr-8" />
      Reviewer
    </>,
    <>
      <EditOutlined className="mr-8" />
      Editor
    </>,
    <>
      <SafetyOutlined className="mr-8" />
      Admin
    </>,
  ];

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

  const onFinish = async (values) => {
    const handleExists = await checkUserHandleExists(values.handle)(
      firebase,
      dispatch
    );
    if (handleExists === false) {
      form.resetFields(["handle"]);
      return form.setFields([
        {
          name: "handle",
          errors: [
            `The handle [${values.handle}] is not a registered CodeLabz user`,
          ],
        },
      ]);
    } else if (values.handle === currentUser) {
      form.resetFields(["handle"]);
      return form.setFields([
        {
          name: "handle",
          errors: [`You can't add yourself. Or can you? o.O`],
        },
      ]);
    } else if (
      _.findIndex(currentOrgUsers, (user) => user.handle === values.handle) !==
      -1
    ) {
      form.resetFields(["handle"]);
      return form.setFields([
        {
          name: "handle",
          errors: [
            `The user [${values.handle}] is already in the organization [${currentOrgHandle}]`,
          ],
        },
      ]);
    } else {
      await addOrgUser({
        org_handle: currentOrgHandle,
        permissions: parseInt(selected.split("_")[1]),
        handle: values.handle,
      })(firestore, dispatch);
    }
  };

  const handlePermissionChange = ({ key }) => {
    setSelected(key);
  };

  const permissionLevelsButton = ({ selected }) => {
    return (
      <Menu
        onClick={(e) => handlePermissionChange({ ...e })}
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
      </Menu>
    );
  };

  return (
    <Form form={form} name="add-org-user" onFinish={onFinish}>
      <Form.Item
        name="handle"
        rules={[
          {
            required: true,
            message: "Please input the user handle you want to add",
          },
        ]}
      >
        <Input placeholder="User Handle" />
      </Form.Item>
      <Form.Item style={{ textAlign: "right" }}>
        <span>Select user role</span>
        <Dropdown
          overlay={permissionLevelsButton({
            selected,
          })}
        >
          <Button className="ml-16">
            {permissionLevelIcons[selected.split("_")[1]]}
            <DownOutlined />
          </Button>
        </Dropdown>
      </Form.Item>
      <Form.Item className="mb-0">
        <Button loading={loading} type="primary" htmlType="submit" block>
          {loading ? "Adding user..." : "Add user"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddOrgUserModal;
