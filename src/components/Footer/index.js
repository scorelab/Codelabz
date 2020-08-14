import React from "react";
import { Row, Col, Divider } from "antd";
import { Link } from "react-router-dom";
import BrandName from "../../helpers/brandName";
import {
  GithubOutlined,
  UnorderedListOutlined,
  BugOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  CheckOutlined,
  LockOutlined,
  QuestionOutlined,
  CopyrightCircleOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="light-grey-bg pt-16 pb-16">
      <Row>
        <Col sm={24} xs={24} md={6} className="col-pad-24">
          <h2 style={{ color: "#3AAFA9" }} className="brand-font mb-0">
            <Link to={"/"}>
              <BrandName />
            </Link>
          </h2>
          <p className="mb-">Live to learn, learn to live.</p>
        </Col>

        <Col xs={24} sm={24} md={6} className="col-pad-24">
          <h3 className="mb-16">About</h3>
          <div className="mt-8 mb-8">
            <a
              href="https://github.com/scorelab/Codelabz"
              target="_blank"
              rel="noreferrer noopener"
              className="mb-8 mt-8 footer-link"
            >
              <QuestionOutlined className="mr-8" /> About CodeLabz
            </a>
          </div>
          <div className="mt-8 mb-8">
            <a
              href="https://github.com/scorelab/Codelabz"
              target="_blank"
              rel="noreferrer noopener"
              className="mb-8 mt-8 footer-link"
            >
              <CheckOutlined className="mr-8" /> Terms and conditions
            </a>
          </div>
          <div className="mt-8 mb-8">
            <a
              href="https://github.com/scorelab/Codelabz"
              target="_blank"
              rel="noreferrer noopener"
              className="mb-8 mt-8 footer-link"
            >
              <LockOutlined className="mr-8" /> Privacy and security
            </a>
          </div>
        </Col>

        <Col xs={24} md={6} className="col-pad-24">
          <h3 className="mb-16">Help</h3>
          <div className="mt-8 mb-8">
            <a
              href="https://github.com/scorelab/Codelabz"
              target="_blank"
              rel="noreferrer noopener"
              className="mb-8 mt-8 footer-link"
            >
              <UnorderedListOutlined className="mr-8" /> FAQ
            </a>
          </div>
          <div className="mt-8 mb-8">
            <a
              href="https://github.com/scorelab/Codelabz"
              target="_blank"
              rel="noreferrer noopener"
              className="mb-8 mt-8 footer-link"
            >
              <GithubOutlined className="mr-8" /> GitHub
            </a>
          </div>
          <div className="mt-8 mb-8">
            <a
              href="https://github.com/scorelab/Codelabz/issues"
              target="_blank"
              rel="noreferrer noopener"
              className="mb-8 mt-8 footer-link"
            >
              <BugOutlined className="mr-8" /> Report a bug
            </a>
          </div>
        </Col>

        <Col xs={24} sm={24} md={6} className="col-pad-24">
          <h3 className="mb-16">Contact</h3>
          <div className="mt-8 mb-8">
            <a href="tel: +94712345678" className="mb-8 mt-8 footer-link">
              <PhoneOutlined className="mr-8" /> +94 712 345 678
            </a>
          </div>
          <div className="mt-8 mb-8">
            <a
              href="mailto: contact@codelabz.com"
              className="mb-8 mt-8 footer-link"
            >
              <MailOutlined className="mr-8" /> contact@codelabz.io
            </a>
          </div>
          <div className="mt-8 mb-8">
            <a
              href="https://www.google.com/maps/place/Sri+Lanka/@7.8571778,78.4609778,7z/data=!3m1!4b1!4m5!3m4!1s0x3ae2593cf65a1e9d:0xe13da4b400e2d38c!8m2!3d7.873054!4d80.771797"
              target="_blank"
              rel="noreferrer noopener"
              className="mb-8 mt-8 footer-link"
            >
              <HomeOutlined className="mr-8" /> 64, Singh Labs, Kings Canyon
            </a>
          </div>
        </Col>
      </Row>

      <Row className="pr-24 pl-24">
        <Divider className="mt-0 mb-0" />
      </Row>

      <Row className="pt-16 pb-0">
        <Col xs={24} className="center">
          <CopyrightCircleOutlined /> {new Date().getFullYear()} CodeLabz
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
