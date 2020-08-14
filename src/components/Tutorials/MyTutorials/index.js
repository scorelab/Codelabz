import React, { useEffect } from "react";
import { Layout, Row, Col } from "antd";
import SearchComponent from "./Search";
// import UserTutorialsComponent from "./UserTutorials";
import OrgTutorialsComponent from "./OrgTutorials";
import {
  getUserTutorialsBasicData,
  getOrgTutorialsBasicData,
  clearTutorialsBasicData,
} from "../../../store/actions";
import { useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";

const MyTutorials = () => {
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const userHandle = useSelector(
    ({
      firebase: {
        profile: { handle },
      },
    }) => handle
  );

  const displayName = useSelector(
    ({
      firebase: {
        profile: { displayName },
      },
    }) => displayName
  );

  const photoURL = useSelector(
    ({
      firebase: {
        profile: { photoURL },
      },
    }) => photoURL
  );

  const organizations = useSelector(
    ({
      profile: {
        data: { organizations },
      },
    }) => organizations
  );

  const org_handles =
    organizations && organizations.length > 0
      ? organizations.map((org) => org.org_handle)
      : [];

  useEffect(() => {
    getUserTutorialsBasicData(userHandle)(firestore, dispatch);
  }, [userHandle, firestore, dispatch]);

  useEffect(() => {
    if (org_handles.length > 0)
      getOrgTutorialsBasicData(org_handles)(firestore, dispatch);
  }, [org_handles, firestore, dispatch]);

  useEffect(() => () => clearTutorialsBasicData()(dispatch), [dispatch]);

  const userDetails = {
    userHandle,
    displayName,
    photoURL,
  };

  return (
    <Layout className="row-footer-below">
      <Row className="mb-24">
        <Col span={24}>
          <SearchComponent />
        </Col>
      </Row>
      {organizations && organizations.length > 0 && (
        <Row className="mb-24">
          <Col span={24}>
            <OrgTutorialsComponent
              organizations={organizations}
              user={userDetails}
            />
          </Col>
        </Row>
      )}
    </Layout>
  );
};

export default MyTutorials;
