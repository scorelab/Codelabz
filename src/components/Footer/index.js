import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import BrandName from "../brandName";

const Footer = () => {
  return (
    <Row className="light-green-bg pt-40 pb-40">
      <Col sm={24} md={6} className="col-pad-24">
        <h2 style={{ color: "#3AAFA9" }} className="brand-font mb-0">
          <Link to={"/"}>
            <BrandName />
          </Link>
        </h2>
        Live to learn, learn to live.
      </Col>
      <Col sm={24} md={6} className="col-pad-24">
        brand
      </Col>
      <Col sm={24} md={6} className="col-pad-24">
        brand
      </Col>
      <Col sm={24} md={6} className="col-pad-24">
        Contact us
        <ul>
          <li>Tel - +94 712345678</li>
          <li>Email - contact@codelabz.com</li>
          <li>Address - 64, Singh Labs, Kings Canyon, Apex Legends.</li>
        </ul>
      </Col>
    </Row>
  );
};

export default Footer;
