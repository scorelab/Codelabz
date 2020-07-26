import React, { useState } from "react";
import OrgSidebar from "./OrgSidebar/orgSidebar";
import { useMediaQuery } from "react-responsive";
import { Row, Col, Layout, Drawer, Button } from "antd";
import OrgInfoCard from "./OrgInfoCard/orgInfoCard";
import OrgUsersCard from "./OrgUsersCard/orgUsersCard";
const { Content, Sider } = Layout;

const Organizations = () => {
  window.scrollTo(0, 0);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 767px)"
  });

  return (
    <Layout className="row-footer-below">
      <Layout>
        {isDesktop && (
          <Sider width={"66px"} theme="light">
            <div className="mini-sidebar-column">
              <OrgSidebar onOrgChange={() => {}} />
            </div>
          </Sider>
        )}

        {!isDesktop && (
          <Drawer
            title="Switch organization"
            placement="bottom"
            closable={true}
            height={"60%"}
            visible={drawerVisible}
            onClose={() => setDrawerVisible(false)}
          >
            <Row>
              <Col xs={24} className="col-pad-24-s pt-0">
                <OrgSidebar
                  onOrgChange={() => {
                    setDrawerVisible(false);
                  }}
                />
              </Col>
            </Row>
          </Drawer>
        )}

        <Content style={{ backgroundColor: "white" }}>
          {!isDesktop && (
            <Row>
              <Col xs={24} className="col-pad-24-s pb-0">
                <Button
                  onClick={() => setDrawerVisible(true)}
                  block
                  type="primary"
                >
                  Switch organization
                </Button>
              </Col>
            </Row>
          )}
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
