import React, { useState, useEffect } from "react";
import { Modal, Button, Select, Form, Input, Alert, Space } from "antd";
import countryList from "../../helpers/countryList";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  GlobalOutlined,
  IeOutlined
} from "@ant-design/icons";
import { checkOrgHandleExists, createOrganization } from "../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

const CreateOrgModal = props => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const loadingProp = useSelector(
    ({
      profile: {
        edit: { loading }
      }
    }) => loading
  );
  const errorProp = useSelector(
    ({
      profile: {
        edit: { error }
      }
    }) => error
  );

  useEffect(() => {
    setLoading(loadingProp);
  }, [loadingProp]);

  useEffect(() => {
    setError(errorProp);
  }, [errorProp]);

  useEffect(() => {
    if (loadingProp === false && errorProp === false) {
      setVisible(false);
    }
  }, [loadingProp, errorProp]);

  /* This part is related to the country dropdown */
  const children = [];
  const [form] = Form.useForm();

  for (let i = 0; i < countryList.length; i++) {
    children.push(
      <Option key={countryList[i].code} value={countryList[i].name}>
        {countryList[i].name}
      </Option>
    );
  }
  /* upto here */

  useEffect(() => {
    if (props.show === true) {
      setVisible(true);
    }
  }, [props.show]);

  // Calls a function in the sidebar to set the modal state to visible false as well
  useEffect(() => {
    if (visible === false) {
      props.closeCallback();
    }
  }, [visible, props]);

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onSubmit = async formData => {
    await createOrganization(formData)(firebase, firestore, dispatch);
  };

  const onOrgHandleChange = async () => {
    const orgHandle = form.getFieldValue("org_handle");
    const orgHandleExists = await checkOrgHandleExists(orgHandle)(
      firebase,
      dispatch
    );

    if (orgHandleExists) {
      form.resetFields(["org_handle"]);
      form.setFields([
        {
          name: "org_handle",
          errors: [`The handle [${orgHandle}] is already taken`]
        }
      ]);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Create new organization"
      onCancel={handleCancel}
      maskClosable={false}
      footer={null}
      centered
    >
      {error && (
        <Alert
          message={""}
          description={"Org creation failed"}
          type="error"
          closable
          className="mb-24"
        />
      )}

      <Form form={form} onFinish={onSubmit}>
        <Form.Item
          name={"org_name"}
          rules={[
            {
              required: true,
              message: "Please enter the organization name"
            },
            {
              type: "string",
              message: "Please provide a valid organization name"
            }
          ]}
        >
          <Input
            prefix={
              <AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Organization Name"
            autoComplete="organization"
          />
        </Form.Item>
        <Form.Item
          name={"org_handle"}
          rules={[
            {
              required: true,
              message: "Please enter your organization handle"
            },
            {
              pattern: new RegExp(/^[a-z0-9]{1,}$/),
              message:
                "Organization handle can only contain lowercase alphanumeric characters"
            },
            {
              pattern: new RegExp(/^[a-z0-9]{6,}$/),
              message: "Organization handle cannot be less than 6 characters"
            }
          ]}
        >
          <Input
            onBlur={onOrgHandleChange}
            prefix={<AppstoreOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Organization Handle"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          name="org_country"
          rules={[
            {
              required: true,
              message: "Please select the country of the organization"
            }
          ]}
        >
          <Select
            style={{ width: "100%" }}
            placeholder={
              <div style={{ textAlign: "left" }}>
                <GlobalOutlined style={{ color: "rgba(0,0,0,.4)" }} /> Country
                of the organization
              </div>
            }
            showSearch={true}
          >
            {children}
          </Select>
        </Form.Item>
        <Form.Item
          name="org_website"
          rules={[
            {
              required: true,
              message: "Please enter the website of the organization"
            },
            {
              pattern: new RegExp(
                /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
              ),
              message: "Please provide a valid URL"
            },
            {
              pattern: new RegExp(/^(http:\/\/|https:\/\/)/),
              message: "URL must contain the protocol (https:// or http://)"
            }
          ]}
          hasFeedback
        >
          <Input
            prefix={<IeOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Website"
            autoComplete="url"
          />
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

export default CreateOrgModal;
