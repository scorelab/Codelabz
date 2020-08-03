import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Space } from "antd";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { removeStep } from "../../../store/actions";

const RemoveStepModal = ({
  owner,
  tutorial_id,
  step_id,
  viewModal,
  currentStep
}) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setVisible(viewModal);
  }, [viewModal]);

  const handleOnOk = () => {
    setLoading(true);
    if (currentStep > 0) {
      removeStep(owner, tutorial_id, step_id, currentStep)(
        firebase,
        firestore,
        dispatch
      ).then(() => {
        setLoading(false);
        setVisible(false);
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
      <Form onFinish={handleOnOk}>
        This action is irreversible!
        <Form.Item className="mb-0">
          <Space style={{ float: "right" }}>
            <Button key="back" onClick={handleOnCancel}>
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {loading ? "Removing..." : "Remove"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RemoveStepModal;
