import React, { useEffect } from "react";
import { Col, Row, Input, Form, message } from "antd";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { updateStepTime, updateStepTitle } from "../../../store/actions";

const StepsTitle = ({
  owner,
  tutorial_id,
  step_id,
  step_title,
  step_time,
  currentStepNo,
}) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ step_title: step_title, step_time: step_time });
  }, [step_time, step_title, form]);

  const setStepTitle = () => {
    const newStepTitle = form.getFieldValue("step_title");
    if (step_title !== newStepTitle && newStepTitle.length > 0) {
      let key = Math.random();
      message.loading({ content: "Updating title...", key, duration: 10 });
      updateStepTitle(
        owner,
        tutorial_id,
        step_id,
        newStepTitle
      )(firebase, firestore, dispatch).then(() =>
        message.success({ content: "Step title updated!", key, duration: 2 })
      );
    }
  };

  const setStepTime = () => {
    const newStepTime = form.getFieldValue("step_time");
    if (step_time !== newStepTime && newStepTime.length > 0) {
      let key = Math.random();
      message.loading({ content: "Updating time...", key, duration: 10 });
      updateStepTime(
        owner,
        tutorial_id,
        step_id,
        newStepTime
      )(firebase, firestore, dispatch).then(() =>
        message.success({ content: "Step time updated!", key, duration: 2 })
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
                name="step_title"
                rules={[{ type: "string" }]}
                style={{ width: "100%" }}
                className="pr-8"
              >
                <Input
                  onBlur={setStepTitle}
                  onPressEnter={setStepTitle}
                  placeholder="Title of the step"
                  className="tutorial-title-input"
                  size="large"
                  prefix={currentStepNo + 1 + "."}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={5}>
              <Form.Item name="step_time">
                <Input
                  onBlur={setStepTime}
                  onPressEnter={setStepTime}
                  placeholder="Time"
                  style={{ width: "100%" }}
                  className="tutorial-title-input"
                  size="large"
                  type="number"
                  suffix="minutes"
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
