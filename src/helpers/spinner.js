import React from "react";
// import Loader from "react-loader-spinner";
import { Row, Col } from "antd";
import BrandName from "../components/brandName";

export default ({ top, design, designSize }) => {
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

//["Audio","BallTriangle","Bars","Circles","Grid","Hearts","Oval","Puff","Rings","TailSpin","ThreeDots","Watch","RevolvingDot","Triangle","Plane","MutatingDots","CradleLoader"]

/* <Loader
    type={design ? design : "BallTriangle"}
    color="#3AAFA9"
    height={designSize ? designSize : 100}
    width={designSize ? designSize : 100}
  />  */
