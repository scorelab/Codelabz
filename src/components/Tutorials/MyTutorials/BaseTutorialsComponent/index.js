import React from "react";
import { Layout, Row, Col } from "antd";
import TutorialCard from "./TutorialCard";
import { useSelector } from "react-redux";
import EmptyTutorials from "../../../../helpers/emptyTutorials";
import Spinner from "../../../../helpers/spinner";

/**
 * @param {string} owner - Owner of the tutorials
 * @param {string} imageURL - Profile image of the owner of the tutorials
 * @param {string} ownerName - Name of the owner of the tutorials
 * @returns {JSX.Element}
 * @constructor
 */
const BaseTutorialsComponent = ({ owner, ownerName }) => {
  const user = useSelector(
    ({
      tutorials: {
        data: { user },
      },
    }) => user
  );

  const org = useSelector(
    ({
      tutorials: {
        data: { org },
      },
    }) => org
  );

  if (user) {
    const index = [...user, ...org];

    const index_array = index.filter((e) => e.owner === owner);

    return (
      <div>
        <Layout>
          <Row justify="start" align="middle">
            {index_array.map((tutorial, index) => (
              <TutorialCard
                key={index}
                tutorialData={tutorial}
                loading={false}
              />
            ))}
            {index_array.length === 0 && (
              <EmptyTutorials org={ownerName} orgHandle={owner} />
            )}
          </Row>
        </Layout>
      </div>
    );
  } else {
    return (
      <Row justify="center" align="middle">
        <Col xs={24} className="col-pad-24">
          <Spinner half />
        </Col>
      </Row>
    );
  }
};

export default BaseTutorialsComponent;
