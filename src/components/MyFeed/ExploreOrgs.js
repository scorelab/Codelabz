import { Button, Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Paragraph from 'antd/lib/typography/Paragraph';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import BrandName from '../../helpers/brandName';
import { clearOrgData, getLaunchedOrgsData } from '../../store/actions';

const ExploreOrgs = () => {
  const loading = useSelector(({ org }) => org.launched.loading);
  const error = useSelector(({ org }) => org.launched.error);
  const launchedOrgs = useSelector(({ org }) => org.launched.data);
  const dispatch = useDispatch();
  const firestore = useFirestore();

  useEffect(() => {
    getLaunchedOrgsData()(firestore, dispatch);
    return () => {
      clearOrgData()(dispatch);
    };
  }, [firestore, dispatch]);

  return (
    <Row justify="center" gutter={[16, 16]}>
      {launchedOrgs &&
        launchedOrgs
          .map((a) => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value)
          .slice(0, 5)
          .map((org) => (
            <Col xs={24} sm={12} md={8} lg={4} key={org.org_handle}>
              <Card
                style={{ height: '100%' }}
                hoverable
                cover={
                  <img src={org.org_image} alt={org.org_handle} width={250} />
                }
              >
                <Meta
                  title={org.org_name}
                  description={
                    <Paragraph ellipsis={{ rows: 2 }}>
                      {org.org_description}
                    </Paragraph>
                  }
                />
              </Card>
            </Col>
          ))}
      <Col xs={24} sm={12} md={8} lg={4}>
        <Card
          hoverable
          style={{ height: '100%' }}
          title="Didn't find?"
          extra={<Button>Explore</Button>}
        >
          <p style={{ height: '100%' }}>
            don't worry there are many organization with
          </p>
          <h1>
            <BrandName />
          </h1>
        </Card>
      </Col>
    </Row>
  );
};

export default ExploreOrgs;
