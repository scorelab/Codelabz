import React from "react";
import OrgSidebar from "./orgSidebar";
import { Row, Col } from "antd";

const Organizations = () => {
  return (
    <Row className="row-footer-below org-row">
      <Col flex="66px">
        <OrgSidebar />
      </Col>
      <Col flex="auto" xs={24} className="col-pad-24-s">
        here comes the content
      </Col>
    </Row>
  );
};

export default Organizations;
