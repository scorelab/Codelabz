import React from "react";
import { Row, Col } from "antd";
import BrandName from "./brandName";

export default ({ half }) => {
  return (
    <Row
      justify={"center"}
      style={{ minHeight: half ? "50vh" : "100vh" }}
      align="middle"
    >
      <Col xs={24} style={{ textAlign: "center" }}>
        <div className="pulse">
          <BrandName />
        </div>
      </Col>
      <Col />
    </Row>
  );
};
