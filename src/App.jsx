import React, { useEffect, useState } from "react";
import Routes from "./routes";
import "./App.less";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData } from "./store/actions";

const App = () => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const organizations = useSelector(
    ({
      firebase: {
        profile: { organizations }
      }
    }) => organizations
  );

  useEffect(() => {
    getProfileData(organizations)(firebase, firestore, dispatch);
  }, [organizations, firebase, dispatch]);

  return <Routes />;
};

export default App;
