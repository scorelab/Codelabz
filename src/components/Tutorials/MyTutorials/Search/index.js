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
      result.forEach((item) => {
        tempArray = [
          ...tempArray,
          ..._.filter(indexData, (ref) => ref.tutorial_id === item.ref),
        ];
      });
      setViewResults(true);
      return setResults(tempArray);
    }
  };

  return (
    <Layout>
      <Row justify="space-between">
        <Col xs={24} md={4} className="col-pad-24">
          <Button onClick={() => setVisibleModal(true)} type="primary">
            <PlusOutlined /> Add New CodeLabz
          </Button>
          <NewTutorial
            viewModal={visibleModal}
            viewCallback={() => setVisibleModal(false)}
          />
        </Col>
        <Col xs={24} md={8} className="col-pad-24">
          <Input.Search
            placeholder="Search CodeLabz by title, summary, or owner"
            onKeyUp={handleOnSearch}
            style={{ width: "100%" }}
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
