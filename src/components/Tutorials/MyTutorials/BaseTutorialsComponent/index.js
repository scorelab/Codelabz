import React from "react";
import { Layout, Row, Col, Avatar, Divider } from "antd";

import TutorialCard from "./TutorialCard";
import { useSelector } from "react-redux";

/**
 * @param {string} owner - Owner of the tutorials
 * @param {string} imageURL - Profile image of the owner of the tutorials
 * @param {string} ownerName - Name of the owner of the tutorials
 * @returns {JSX.Element}
 * @constructor
 */
const BaseTutorialsComponent = ({ owner, imageURL, ownerName }) => {
  const user = useSelector(
    ({
      tutorials: {
        data: { user }
      }
    }) => user
  );

  const org = useSelector(
    ({
      tutorials: {
        data: { org }
      }
    }) => org
  );

  if (user) {
    const index = [...user, ...org];

    const index_array = index.filter(e => e.owner === owner);

    return (
      <div>
        <Layout>
          <Row justify="space-around" align="middle">
            <Col span={2}>
              <Avatar size={64} src={imageURL} />
            </Col>
            <Col span={22}>{ownerName}</Col>
          </Row>
          <Divider />
          <Row justify="space-around" align="middle">
            {index_array.map((tutorial, index) => (
              <TutorialCard
                key={index}
                tutorialData={tutorial}
                loading={false}
              />
            ))}
            {index_array.length === 0 && "No CodeLabz to display"}
          </Row>
        </Layout>
      </div>
    );
  } else {
    return (
      <div>
        <Layout>
          <Row justify="space-around" align="middle">
            <Col span={2}>
              <Avatar size={64} src={imageURL} />
            </Col>
            <Col span={22}>{ownerName}</Col>
          </Row>
          <Divider />
          <Row justify="space-around" align="middle">
            <TutorialCard tutorialData={{}} loading={true} />
          </Row>
        </Layout>
      </div>
    );
  }
};

export default BaseTutorialsComponent;
