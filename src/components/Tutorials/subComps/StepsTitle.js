import React, { useState, useEffect } from "react";
import { Col, Row, Input, InputNumber, Form, message } from "antd";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { updateStepTime, updateStepTitle } from "../../../store/actions";

const StepsTitle = ({ owner, tutorial_id }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [step_id, set_step_id] = useState(null);
  const [step_title, set_step_title] = useState(null);
  const [step_time, set_step_time] = useState(null);

  const current_step_no = useSelector(
    ({
      tutorials: {
        editor: { current_step_no }
      }
    }) => current_step_no
  );
  const current_data = useSelector(
    ({
      tutorials: {
        current: { data }
      }
    }) => data
  );

  useEffect(() => {
    if (current_data) {
      const { steps } = current_data;
      const current_step_data = steps[current_step_no];
      set_step_id(current_step_data.id);
      set_step_title(current_step_data.title);
      set_step_time(current_step_data.time);
      form.setFieldsValue({
        step_title,
        step_time
      });
    }
  }, [
    step_title,
    step_time,
    form,
    current_data,
    set_step_id,
    set_step_title,
    set_step_time,
    current_step_no
  ]);

  const setStepTitle = () => {
    const newStepTitle = form.getFieldValue("step_title");
    if (step_title !== newStepTitle) {
      updateStepTitle(owner, tutorial_id, step_id, newStepTitle)(
        firebase,
        firestore,
        dispatch
      ).then(() => message.success(`Step title updated!`));
    }
  };

  const setStepTime = () => {
    const newStepTime = form.getFieldValue("step_time");
    if (step_time !== newStepTime) {
      updateStepTime(owner, tutorial_id, step_id, newStepTime)(
        firebase,
        firestore,
        dispatch
      ).then(() => message.success(`Step time updated!`));
    }
  };

  return (
    <Row>
      <Col xs={24}>
        <Form form={form}>
          <Row style={{ width: "100%" }}>
            <Col xs={24} md={18}>
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
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                name="step_time"
                rules={[{ type: "number", min: 0, max: 99 }]}
              >
                <InputNumber
                  onBlur={setStepTime}
                  onPressEnter={setStepTime}
                  placeholder="Time (minutes)"
                  style={{ width: "100%" }}
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
