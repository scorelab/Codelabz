import React from "react";
import { Col, Divider, Layout, Row } from "antd";
import TutorialCard from "../BaseTutorialsComponent/TutorialCard";

const SearchResultsComponent = ({ results }) => {
  return (
    <div>
      <Layout>
        <Divider />
        <Row justify="space-around" align="middle">
          <Col span={24}>{"Search Results"}</Col>
        </Row>
        <Divider />
        <Row justify="space-around" align="middle">
          {results.map((tutorial, index) => (
            <TutorialCard key={index} tutorialData={tutorial} loading={false} />
          ))}
          {results.length === 0 && "No CodeLabz with the given query"}
        </Row>
        <Divider />
      </Layout>
    </div>
  );
};

export default SearchResultsComponent;
