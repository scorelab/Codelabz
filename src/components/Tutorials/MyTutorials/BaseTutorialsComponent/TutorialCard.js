import React from "react";
import { Card, Avatar, Col } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;

const TutorialCard = ({
  tutorialData: { tutorial_id, title, summary, icon, featured_image, owner },
  loading,
}) => {
  return (
    <Col xs={24} sm={12} md={8} lg={6} xxl={4} className="pr-24">
      <Card
        loading={loading}
        className={"mb-24"}
        style={{ width: "100%" }}
        cover={
          <img
            alt="example"
            src={
              loading
                ? "https://i0.wp.com/www.cssscript.com/wp-content/uploads/2015/11/ispinner.jpg"
                : featured_image
                ? featured_image
                : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            }
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <Link to={`/tutorials/${owner}/${tutorial_id}`}>
            <EditOutlined key="edit" />
          </Link>,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
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
      </Card>
    </Col>
  );
};

export default TutorialCard;
