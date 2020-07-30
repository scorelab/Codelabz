import React from "react";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;

const TutorialCard = ({
  tutorialData: { tutorial_id, title, summary, icon, featured_image, owner },
  loading
}) => {
  return (
    <Card
      loading={loading}
      className={"mb-24"}
      style={{ width: 300 }}
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
        <EllipsisOutlined key="ellipsis" />
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
  );
};

export default TutorialCard;
