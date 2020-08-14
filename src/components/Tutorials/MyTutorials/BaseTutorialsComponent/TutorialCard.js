import React from "react";
import { Card, Avatar, Col, Skeleton, Button } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const TutorialCard = ({
  tutorialData: { tutorial_id, title, summary, icon, owner },
  loading,
}) => {
  return (
    <Col xs={24} sm={12} md={8} lg={6} xxl={4} className="pr-24">
      <Card
        loading={loading}
        className="mb-24 tutorial-card"
        style={{ width: "100%" }}
        actions={[
          <Link to={`/tutorials/${owner}/${tutorial_id}`}>
            <Button type="primary">View</Button>
          </Link>,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar
                src={
                  icon
                    ? icon
                    : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                }
              />
            }
            title={title}
            description={summary}
          />
        </Skeleton>
      </Card>
    </Col>
  );
};

export default TutorialCard;
