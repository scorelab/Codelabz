import React from "react";
import { Row, Col, Layout } from "antd";
import ProfileInfoCard from "./ProfileInfoCard";
const { Content } = Layout;

const Profile = () => {
  return (
    <Layout className="row-footer-below">
      <Layout>
        <Content style={{ backgroundColor: "white" }}>
          <Row>
            <Col xs={24} sm={24} md={24} className="col-pad-24-s">
              <ProfileInfoCard />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Profile;
