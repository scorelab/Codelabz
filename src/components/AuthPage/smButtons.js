import React from "react";
import { Row, Col, Space, Button } from "antd";
import {
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
  GithubOutlined,
} from "@ant-design/icons";
const SmButtons = () => {
  return (
    <Row justify="center" align="center">
      <Col sm={16} className="center">
        <Space>
          <Button
            shape="circle"
            size="large"
            icon={<GoogleOutlined style={{ color: "#db3236" }} />}
          />
          <Button
            shape="circle"
            size="large"
            icon={<FacebookOutlined style={{ color: "#4267B2" }} />}
          />
          <Button
            shape="circle"
            size="large"
            icon={<TwitterOutlined style={{ color: "#1DA1F2" }} />}
          />
          <Button
            shape="circle"
            size="large"
            icon={<GithubOutlined style={{ color: "#211F1F" }} />}
          />
        </Space>
      </Col>
    </Row>
  );
};

export default SmButtons;
