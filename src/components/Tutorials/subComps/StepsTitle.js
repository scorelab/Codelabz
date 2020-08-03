import React from "react";
import { Col, Row, Input, InputNumber, Form } from "antd";

const StepsTitle = () => {
  return (
    <Row>
      <Col xs={24}>
        <Form>
          <Row style={{ width: "100%" }}>
            <Col xs={24} md={18}>
              <Form.Item
                name="step-title"
                rules={[{ type: "text" }]}
                style={{ width: "100%" }}
                className="pr-8"
              >
                <Input
                  placeholder="Title of the step"
                  size="large"
                  className="tutorial-title-input"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                name="step-time"
                rules={[{ type: "number", min: 0, max: 99 }]}
                label="minutes"
                labelAlign="left"
              >
                <InputNumber
                  placeholder="Time (minutes)"
                  style={{ width: "50%" }}
                  className="tutorial-title-input"
                  size="large"
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
