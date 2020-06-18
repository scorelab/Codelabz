import React from "react";
import { Row, Col } from "antd";
import BrandName from "./brandName";

export default () => {
  return (
    <Row justify={"center"} style={{ minHeight: "100vh" }} align="middle">
      <Col xs={24} style={{ textAlign: "center" }}>
        <div className="pulse">
          <BrandName />
        </div>
      </Col>
      <Col />
    </Row>
  );
};
