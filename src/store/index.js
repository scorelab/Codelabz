import { createStore, applyMiddleware, compose } from "redux";
import { getFirebase } from "react-redux-firebase";
import { createFirestoreInstance, getFirestore } from "redux-firestore";
import _ from "lodash";

import thunk from "redux-thunk";

import rootReducer from "./reducers";

import firebase from "../config";

// react-redux-firebase config
const rrfConfig = {
  userProfile: "cl_user", // Profile data stored in Firestore/cl_user/user_id
  presence: "cl_user_presence",
  sessions: "cl_user_sessions",
  profileFactory: (userData, profileData, firebase) => {
    const emailFromPasswordSignUp = _.get(userData, "user.email", false);
    const uidFromPasswordSignUp = _.get(userData, "user.uid", false);
    const emailFromProviderSignUp = _.get(userData, "email", false);
    const uidFromProviderSignUp = _.get(userData, "uid", false);
    const displayNameFromProviderSignUp = _.get(userData, "displayName", false);
    const photoURLFromProviderSignUp = _.get(userData, "photoURL", false);
    const providerData = _.get(userData, "providerData", false);
    return {
      email:
        emailFromPasswordSignUp ||
        emailFromProviderSignUp ||
        (providerData && providerData[0].email),
      uid: uidFromPasswordSignUp || uidFromProviderSignUp,
      displayName:
        displayNameFromProviderSignUp ||
        (providerData && providerData[0].displayName) ||
        "",
      photoURL:
        photoURLFromProviderSignUp ||
        (providerData && providerData[0].photoURL) ||
        "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
  },
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime
  attachAuthIsReady: true
};

// Create store with reducers and initial state
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
  )
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

export default store;
