import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Alert, Space } from "antd";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  IeOutlined,
} from "@ant-design/icons";
import { checkOrgHandleExists, createOrganization } from "../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import CountryDropdown from "../../helpers/countryDropdown";
import {
  orgWebsiteValidation,
  orgHandleValidation,
  orgNameValidation,
} from "../../helpers/validationRules";

const CreateOrgModal = (props) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const loadingProp = useSelector(
    ({
      profile: {
        edit: { loading },
      },
    }) => loading
  );
  const errorProp = useSelector(
    ({
      profile: {
        edit: { error },
      },
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

  const [form] = Form.useForm();

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

  const onSubmit = async (formData) => {
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
          errors: [`The handle [${orgHandle}] is already taken`],
        },
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
        <Form.Item name={"org_name"} rules={orgNameValidation}>
          <Input
            prefix={
              <AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Organization Name"
            autoComplete="organization"
          />
        </Form.Item>
        <Form.Item name={"org_handle"} rules={orgHandleValidation}>
          <Input
            onBlur={onOrgHandleChange}
            prefix={<AppstoreOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Organization Handle"
            autoComplete="off"
          />
        </Form.Item>
        <CountryDropdown />
        <Form.Item name="org_website" rules={orgWebsiteValidation} hasFeedback>
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
