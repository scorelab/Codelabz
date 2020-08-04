import React from "react";
import { Col, Row, Input, Form } from "antd";

const StepsTitle = ({ currentStepNo }) => {
  return (
    <Row>
      <Col xs={24}>
        <Form>
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
                style={{ width: "100%" }}
                className="pr-8"
              >
                <Input
                  prefix={currentStepNo + 1 + ". "}
                  placeholder="Title of the step"
                  size="large"
                  className="tutorial-title-input"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={5}>
              <Form.Item name="step-time">
                <Input
                  placeholder="Time"
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
