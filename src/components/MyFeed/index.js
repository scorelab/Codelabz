import { Card, Col, Row } from 'antd';
import React from 'react';
import BrandName from '../../helpers/brandName';
import ExploreOrgs from './ExploreOrgs';

const MyFeed = () => {
  return (
    <Card bordered={false}>
      <Row justify="center">
        <Col xs={24} md={8} />
        <Col xs={24} md={8}>
          <h2 style={{ textAlign: 'center' }}>
            <BrandName /> My Feed
          </h2>
        </Col>
        <Col xs={24} md={8} />
      </Row>
      <Col>
        <h2>Explore Organizations</h2>
        <p>
          Explore top rated Organizations and find the <b>Codelabz</b> you are
          looking for;
        </p>
      </Col>
      <ExploreOrgs />
      {/* <Divider />
      <Col>
        <h2>Explore Codelabz</h2>
        <p>
          Explore top rated User created <b>Codelabz</b> and find what you are
          looking for;
        </p>
      </Col> */}
    </Card>
  );
};

export default MyFeed;
