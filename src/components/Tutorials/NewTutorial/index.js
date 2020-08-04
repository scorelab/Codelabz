import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Input, Modal, Space, Select, Avatar } from "antd";
import {
  tutorialTitleNameValidation,
  tutorialOwnerValidation,
} from "../../../helpers/validationRules";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { avatarName } from "../../../helpers/avatarName";
import { createTutorial } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

const NewTutorial = ({ viewModal, viewCallback, active }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form] = Form.useForm();

  const loadingProp = useSelector(
    ({
      tutorials: {
        create: { loading },
      },
    }) => loading
  );
  const errorProp = useSelector(
    ({
      tutorials: {
        create: { error },
      },
    }) => error
  );

  useEffect(() => {
    setLoading(loadingProp);
  }, [loadingProp]);

  useEffect(() => {
    setError(errorProp);
  }, [errorProp]);

  const organizations = useSelector(
    ({
      profile: {
        data: { organizations },
      },
    }) => organizations
  );

  const userHandle = useSelector(
    ({
      firebase: {
        profile: { handle },
      },
    }) => handle
  );

  const displayName = useSelector(
    ({
      firebase: {
        profile: { displayName },
      },
    }) => displayName
  );

  const photoURL = useSelector(
    ({
      firebase: {
        profile: { photoURL },
      },
    }) => photoURL
  );

  const allowOrgs = organizations && organizations.length > 0;

  const orgList =
    allowOrgs > 0
      ? organizations.map((org, i) => {
          if (org.permissions.includes(3) || org.permissions.includes(2)) {
            return (
              <Select.Option value={org.org_handle} key={i}>
                <Avatar src={org.org_image} size="small" className="mr-8 ml-0">
                  {avatarName(org.org_name)}
                </Avatar>{" "}
                {org.org_name}
              </Select.Option>
            );
          } else {
            return null;
          }
        })
      : null;

  useEffect(() => {
    setVisible(viewModal);
  }, [viewModal]);

  const onSubmit = (formData) => {
    const tutorialData = {
      ...formData,
      created_by: userHandle,
      is_org: userHandle !== formData.owner,
    };
    createTutorial(tutorialData)(firebase, firestore, dispatch, history);
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onOwnerChange = (value) => {
    form.setFieldsValue({
      owner: value,
    });
  };

  return (
    <Modal
      title={`Add New Tutorial`}
      visible={visible}
      onCancel={() => viewCallback()}
      onOk={() => viewCallback()}
      footer={false}
      destroyOnClose={true}
      maskClosable={false}
      forceRender={true}
    >
      {error && (
        <Alert
          message={""}
          description={"Tutorial Creation Failed"}
          type="error"
          closable
          className="mb-24"
        />
      )}
      <Form form={form} onFinish={onSubmit} initialValues={{ owner: active }}>
        <Form.Item name={"title"} rules={tutorialTitleNameValidation}>
          <Input
            prefix={
              <AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Title of the Tutorial"
            autoComplete="title"
          />
        </Form.Item>

        <Form.Item name={"summary"} rules={tutorialTitleNameValidation}>
          <Input
            prefix={
              <AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Summary of the Tutorial"
            autoComplete="summary"
          />
        </Form.Item>

        <Form.Item name={"owner"} rules={tutorialOwnerValidation}>
          <Select
            placeholder="Select the owner of the tutorial"
            onChange={onOwnerChange}
          >
            <Select.Option value={userHandle}>
              <Avatar src={photoURL} size="small" className="mr-8 ml-0">
                {avatarName(displayName)}
              </Avatar>{" "}
              {displayName}
            </Select.Option>
            {orgList}
          </Select>
        </Form.Item>

        <Form.Item className="mb-0">
          <Space style={{ float: "right" }}>
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewTutorial;
