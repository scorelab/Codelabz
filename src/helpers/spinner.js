import React from "react";
import Loader from "react-loader-spinner";
import { Row, Col } from "antd";

export default ({ top, design, designSize }) => {
  return (
    <Row>
      <Col />
      <Col>
        <div style={{ minHeight: "100vh" }}>
          <div
            style={
              top
                ? { position: "relative", top: top }
                : { position: "relative", top: "45vh" }
            }
          >
            <Loader
              type={design ? design : "MutatingDots"}
              color="#000000"
              height={designSize ? designSize : 100}
              width={designSize ? designSize : 100}
            />
          </div>
        </div>
      </Col>
      <Col />
    </Row>
  );
};
