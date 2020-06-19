import React from "react";
import OrgSidebar from "./orgSidebar";
import { useMediaQuery } from "react-responsive";
import { Row, Col } from "antd";
import OrgInfoCard from "./orgInfoCard";

const Organizations = () => {
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 767px)",
  });

  return (
    <Row className="row-footer-below" style={{ marginBottom: "-42px" }}>
      {isDesktop && (
        <Col flex="66px">
          <OrgSidebar />
        </Col>
      )}

      <Col flex="auto" xs={24}>
        <Row>
          <Col xs={24} md={16} className="col-pad-24-s">
            <OrgInfoCard />`
          </Col>
          <Col xs={24} md={8} className="col-pad-24-s">
            users
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Organizations;
