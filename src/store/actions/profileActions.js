import * as actions from "./actionTypes";
import { checkOrgHandleExists } from "./authActions";
import { getOrgBasicData } from "./orgActions";
import _ from "lodash";

export const clearProfileEditError = () => async dispatch => {
  dispatch({ type: actions.CLEAR_PROFILE_EDIT_STATE });
};

export const setCurrentOrgUserPermissions = (
  org_handle,
  permissions
) => dispatch => {
  try {
    dispatch({
      type: actions.SET_CURRENT_ORG_PERMISSIONS_START
    });
    dispatch({
      type: actions.SET_CURRENT_ORG_PERMISSIONS_SUCCESS,
      payload: { org_handle, permissions }
    });
  } catch (e) {
    dispatch({
      type: actions.SET_CURRENT_ORG_PERMISSIONS_FAIL
    });
  }
};

export const getProfileData = organizations => async (firebase, dispatch) => {
  try {
    let orgs = [];
    if (organizations && organizations.length > 0) {
      dispatch({ type: actions.GET_PROFILE_DATA_START });
      const promises = organizations.map(org_handle =>
        getOrgBasicData(org_handle)(firebase)
      );
      orgs = await Promise.all(promises);
      setCurrentOrgUserPermissions(orgs[0].org_handle, orgs[0].permissions)(
        dispatch
      );
      dispatch({
        type: actions.GET_PROFILE_DATA_SUCCESS,
        payload: { organizations: _.orderBy(orgs, ["org_handle"], ["asc"]) }
      });
    } else {
      dispatch({ type: actions.GET_PROFILE_DATA_END });
    }
  } catch (e) {
    dispatch({ type: actions.GET_PROFILE_DATA_FAIL, payload: e.message });
  }
};

export const createOrganization = orgData => async (
  firebase,
  firestore,
  dispatch
) => {
  try {
    dispatch({ type: actions.PROFILE_EDIT_START });
    const userData = firebase.auth().currentUser;
    const { org_name, org_handle, org_country, org_website } = orgData;
    const isOrgHandleExists = await checkOrgHandleExists(org_handle)(firebase);

    if (isOrgHandleExists) {
      dispatch({
        type: actions.PROFILE_EDIT_FAIL,
        payload: { message: `Handle [${org_handle}] is already taken` }
      });
      return;
    }

    await firestore.set(
      { collection: "cl_org_general", doc: org_handle },
      {
        org_name,
        org_handle,
        org_website,
        org_country,
        org_email: userData.email,
        org_created_date: firestore.FieldValue.serverTimestamp(),
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp()
      }
    );

    const timeOutID = setTimeout(() => {
      firestore
        .collection("cl_user")
        .doc(userData.uid)
        .update({ organizations: firestore.FieldValue.arrayUnion(org_handle) })
        .then(() => {
          clearTimeout(timeOutID);
          dispatch({ type: actions.PROFILE_EDIT_SUCCESS });
          window.location.reload();
        });
    }, 7000);
  } catch (e) {
    dispatch({ type: actions.PROFILE_EDIT_FAIL, payload: e.message });
  }
};

export const updateUserProfile = ({
  displayName,
  website,
  link_facebook,
  link_github,
  link_linkedin,
  link_twitter,
  description,
  country
}) => async (firebase, firestore, dispatch) => {
  try {
    dispatch({ type: actions.PROFILE_EDIT_START });
    await firebase.updateProfile(
      {
        displayName,
        website,
        link_facebook,
        link_github,
        link_linkedin,
        link_twitter,
        description,
        country,
        updatedAt: firestore.FieldValue.serverTimestamp()
      },
      { useSet: false, merge: true }
    );
    dispatch({ type: actions.PROFILE_EDIT_SUCCESS });
    dispatch({ type: actions.CLEAR_PROFILE_EDIT_STATE });
  } catch (e) {
    dispatch({ type: actions.PROFILE_EDIT_FAIL, payload: e.message });
  }
};

export const uploadProfileImage = (file, user_handle) => async (
  firebase,
  dispatch
) => {
  try {
    const userData = firebase.auth().currentUser;
    const storagePath = `user/${user_handle}/images`;
    const dbPath = "cl_user";
    await firebase.uploadFile(storagePath, file, dbPath, {
      metadataFactory: (uploadRes, firebase, metadata, downloadURL) => {
        return { photoURL: downloadURL };
      },
      documentId: userData.uid
    });
  } catch (e) {
    dispatch({ type: actions.PROFILE_EDIT_FAIL, payload: e.message });
  }
};
