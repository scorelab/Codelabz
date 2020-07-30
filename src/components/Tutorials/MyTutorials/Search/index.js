import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Input, Button } from "antd";
import SearchResultsComponent from "./SearchResultsComponent";
import { searchFromTutorialsIndex } from "../../../../store/actions";
import _ from "lodash";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import NewTutorial from "../../NewTutorial";

const SearchComponent = () => {
  const [results, setResults] = useState([]);
  const [viewResults, setViewResults] = useState(false);
  const [indexData, setIndexData] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

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

  useEffect(() => {
    if (user && org) {
      setIndexData([...user, ...org]);
    }
  }, [user, org]);

  const handleOnSearch = ({ target: { value } }) => {
    if (value === "") {
      return setViewResults(false);
    }
    const result = searchFromTutorialsIndex(value);
    if (result.length === 0) {
      setViewResults(true);
      return setResults([]);
    }
    if (result.length > 0) {
      let tempArray = [];
      result.forEach(item => {
        tempArray = [
          ...tempArray,
          ..._.filter(indexData, ref => ref.tutorial_id === item.ref)
        ];
      });
      setViewResults(true);
      return setResults(tempArray);
    }
  };

  return (
    <Layout>
      <Row className={"mt-24 mb-24"}>
        <Col span={4} />
        <Col span={8}>Search CodeLabz</Col>
        <Col span={8}>
          <Input.Search
            placeholder="Search CodeLabz by title, summary, or owner"
            onKeyUp={handleOnSearch}
            style={{ width: "80%" }}
          />
        </Col>
        <Col span={4}>
          <Button onClick={() => setVisibleModal(true)}>
            <PlusOutlined /> Add New Tutorial
          </Button>
          <NewTutorial
            viewModal={visibleModal}
            viewCallback={() => setVisibleModal(false)}
          />
        </Col>
      </Row>
      {viewResults && (
        <Row className={"mb-24"}>
          <SearchResultsComponent results={results} />
        </Row>
      )}
    </Layout>
  );
};

export default SearchComponent;
