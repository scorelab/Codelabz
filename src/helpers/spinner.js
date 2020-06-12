import React from "react";
import Loader from "react-loader-spinner";
import { Row, Col } from "antd";

export default ({ top, design, designSize }) => {
  return (
    <Row justify={"center"}>
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
              type={design ? design : "BallTriangle"}
              color="#3AAFA9"
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

//["Audio","BallTriangle","Bars","Circles","Grid","Hearts","Oval","Puff","Rings","TailSpin","ThreeDots","Watch","RevolvingDot","Triangle","Plane","MutatingDots","CradleLoader"]
