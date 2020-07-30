import React from "react";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from "@ant-design/icons";
const { Meta } = Card;

const TutorialCard = ({
  tutorialData: { tutorial_id, title, summary, icon, featured_image },
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
          }
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined onClick={() => console.log(tutorial_id)} key="edit" />,
        <EllipsisOutlined key="ellipsis" />
      ]}
    >
      <Meta
        avatar={<Avatar src={icon} />}
        title={title}
        description={summary}
      />
    </Card>
  );
};

export default TutorialCard;
