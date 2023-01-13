import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import {
  clearTutorialsBasicData,
  getOrgTutorialsBasicData,
  getUserTutorialsBasicData
} from "../../../store/actions";
// import UserTutorialsComponent from "./UserTutorials";
import OrgTutorialsComponent from "./OrgTutorials";
import Header from "./Search";

const MyTutorials = () => {
  const [org_handles, setOrgHandles] = useState([]);
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const userHandle = useSelector(
    ({
      firebase: {
        profile: { handle }
      }
    }) => handle
  );

  const displayName = useSelector(
    ({
      firebase: {
        profile: { displayName }
      }
    }) => displayName
  );

  const photoURL = useSelector(
    ({
      firebase: {
        profile: { photoURL }
      }
    }) => photoURL
  );

  const organizations = useSelector(
    ({
      profile: {
        data: { organizations }
      }
    }) => organizations
  );

  useEffect(() => {
    setOrgHandles(
      organizations && organizations.length > 0
        ? organizations.map(org => org.org_handle)
        : []
    );
  }, [organizations]);

  useEffect(() => {
    getUserTutorialsBasicData(userHandle)(firestore, dispatch);
  }, [userHandle, firestore, dispatch]);

  useEffect(() => {
    console.log("org_handles", org_handles);
    if (org_handles.length > 0)
      getOrgTutorialsBasicData(org_handles)(firestore, dispatch);
  }, [org_handles, firestore, dispatch]);

  useEffect(() => () => clearTutorialsBasicData()(dispatch), [dispatch]);

  const userDetails = {
    userHandle,
    displayName,
    photoURL
  };

  return (
    <div className="row-footer-below" data-testId="tutorialMainBody">
      <Grid container>
        <Grid xs={12} className="mb-24">
          <Header />
        </Grid>
        {organizations && organizations.length > 0 && (
          <Grid xs={12} className="m-24">
            <OrgTutorialsComponent
              organizations={organizations}
              user={userDetails}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default MyTutorials;
