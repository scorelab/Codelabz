import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Space, message } from "antd";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { removeStep } from "../../../store/actions";

const RemoveStepModal = ({
  owner,
  tutorial_id,
  step_id,
  viewModal,
  currentStep,
  step_length,
}) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(viewModal);
  }, [viewModal]);

  const handleOnOk = () => {
    let key = Math.random();
    message.loading({ content: "Removing step...", key, duration: 10 });
    if (step_length > 1) {
      removeStep(
        owner,
        tutorial_id,
        step_id,
        currentStep
      )(firebase, firestore, dispatch).then(() => {
        setVisible(false);
        message.success({ content: "Step removed!", key, duration: 2 });
      });
    }
  };
  const handleOnCancel = () => setVisible(false);

  return (
    <Modal
      title={`Do you really want to remove this step?`}
      visible={visible}
      onCancel={handleOnCancel}
      onOk={handleOnCancel}
      footer={false}
      destroyOnClose={true}
      maskClosable={true}
    >
      This action is can not be undone!
      <Form onFinish={handleOnOk}>
        <Form.Item className="mb-0 mt-24">
          <Space style={{ float: "right" }}>
            <Button key="back" onClick={handleOnCancel}>
              Cancel
            </Button>
            <Button key="submit" type="primary" htmlType="submit">
              Remove
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RemoveStepModal;
