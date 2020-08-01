import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Input, InputNumber, Modal, Space } from "antd";
import {
  addNewStepNameValidation,
  addNewStepTimeValidation
} from "../../../helpers/validationRules";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { AppstoreAddOutlined } from "@ant-design/icons";
import {
  addNewTutorialStep,
  clearCreateTutorials
} from "../../../store/actions";

const AddNewStepModal = ({
  viewModal,
  viewCallback,
  tutorial_id,
  steps_length,
  owner
}) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    clearCreateTutorials()(dispatch);
    return () => {
      clearCreateTutorials()(dispatch);
    };
  }, [dispatch]);

  const loadingProp = useSelector(
    ({
      tutorials: {
        create: { loading }
      }
    }) => loading
  );
  const errorProp = useSelector(
    ({
      tutorials: {
        create: { error }
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
    setVisible(viewModal);
  }, [viewModal]);

  useEffect(() => {
    if (loading === false && error === false) {
      setVisible(false);
      clearCreateTutorials()(dispatch);
    }
  }, [loading, error, dispatch]);

  const [form] = Form.useForm();

  const onSubmit = formData => {
    const set_data = {
      ...formData,
      id: `${tutorial_id}_step_${steps_length + 1}`,
      tutorial_id,
      owner
    };
    addNewTutorialStep(set_data)(firebase, firestore, dispatch);
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal
      title={`Add New Step`}
      visible={visible}
      onCancel={() => viewCallback()}
      onOk={() => viewCallback()}
      footer={false}
      destroyOnClose={true}
      maskClosable={false}
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
      <Form form={form} onFinish={onSubmit}>
        <Form.Item name={"title"} rules={addNewStepNameValidation}>
          <Input
            prefix={
              <AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Title of the Step"
            autoComplete="title"
          />
        </Form.Item>

        <Form.Item name={"time"} rules={addNewStepTimeValidation}>
          <InputNumber placeholder="Time (minutes)" style={{ width: "100%" }} />
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

export default AddNewStepModal;
