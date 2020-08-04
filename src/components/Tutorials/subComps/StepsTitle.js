import React from "react";
import { Col, Row, Input, InputNumber, Form, message } from "antd";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { updateStepTime, updateStepTitle } from "../../../store/actions";

const StepsTitle = ({ owner, tutorial_id, step_id, step_title, step_time }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const setStepTitle = () => {
    const newStepTitle = form.getFieldValue("step_title");
    if (step_title !== newStepTitle) {
      updateStepTitle(
        owner,
        tutorial_id,
        step_id,
        newStepTitle
      )(firebase, firestore, dispatch).then(() =>
        message.success(`Step title updated!`)
      );
    }
  };

  const setStepTime = () => {
    const newStepTime = form.getFieldValue("step_time");
    if (step_time !== newStepTime) {
      updateStepTime(
        owner,
        tutorial_id,
        step_id,
        newStepTime
      )(firebase, firestore, dispatch).then(() =>
        message.success(`Step time updated!`)
      );
    }
  };

  return (
    <Row>
      <Col xs={24}>
        <Form form={form}>
          <Row style={{ width: "100%" }}>
            <Col xs={24} md={19}>
              <Form.Item
                name="step-title"
                rules={[
                  {
                    required: true,
                    message: "Please enter the title of the step",
                  },
                ]}
                initialValue={step_title}
                style={{ width: "100%" }}
                className="pr-8"
              >
                <Input
                  prefix={currentStepNo + 1 + ". "}
                  placeholder="Title of the step"
                  size="large"
                  className="tutorial-title-input"
                  onBlur={setStepTitle}
                  onPressEnter={setStepTitle}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={5}>
              <Form.Item
                initialValue={step_time}
                name="step_time"
                rules={[{ type: "number", min: 0, max: 99 }]}
              >
                <Input
                  onBlur={setStepTime}
                  onPressEnter={setStepTime}
                  placeholder="Time (minutes)"
                  style={{ width: "100%" }}
                  className="tutorial-title-input"
                  size="large"
                  suffix="minutes"
                  type="number"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default StepsTitle;
