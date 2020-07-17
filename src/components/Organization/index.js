import React from "react";
import OrgSidebar from "./OrgSidebar/orgSidebar";
import { useMediaQuery } from "react-responsive";
import { Row, Col, Layout } from "antd";
import OrgInfoCard from "./OrgInfoCard/orgInfoCard";
import OrgUsersCard from "./OrgUsersCard/orgUsersCard";
const { Content, Sider } = Layout;

const Organizations = () => {
  window.scrollTo(0, 0);
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 767px)",
  });

  return (
    <Layout className="row-footer-below">
      <Layout>
        {isDesktop && (
          <Sider width={"66px"} theme="light">
            <OrgSidebar />
          </Sider>
        )}

        <Content style={{ backgroundColor: "white" }}>
          <Row>
            <Col xs={24} sm={24} md={14} className="col-pad-24-s pr-12">
              <OrgInfoCard />
            </Col>
            <Col xs={24} sm={24} md={10} className="col-pad-24-s pl-12">
              <OrgUsersCard />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Organizations;
