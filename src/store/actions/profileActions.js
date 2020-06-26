import * as actions from "./actionTypes";
import { checkOrgHandleExists } from "./authActions";

export const clearProfileEditError = () => async (dispatch) => {
  dispatch({ type: actions.CLEAR_PROFILE_EDIT_STATE });
};

const getOrgBasicData = (org_handle) => async (firebase) => {
  try {
    const firestore = firebase.firestore();
    const {
      currentUser: { uid },
    } = firebase.auth();
    const orgDoc = await firestore
      .collection("cl_org_general")
      .doc(org_handle)
      .get();

    if (!orgDoc.exists) return null;

    const org_name = orgDoc.get("org_name");
    const org_image = orgDoc.get("org_image");
    const org_link_facebook = orgDoc.get("org_link_facebook");
    const org_link_github = orgDoc.get("org_link_github");
    const org_link_linkedin = orgDoc.get("org_link_linkedin");
    const org_link_twitter = orgDoc.get("org_link_twitter");
    const org_website = orgDoc.get("org_website");
    const org_published = orgDoc.get("org_published");
    const org_description = orgDoc.get("org_description");
    const org_country = orgDoc.get("org_country");

    const orgPermissionDoc = await firestore
      .collection("cl_org_general")
      .doc(org_handle)
      .collection("cl_org_users")
      .doc("users")
      .get();

    if (!orgPermissionDoc.exists) return null;

    const user_permissions = orgPermissionDoc.get(uid);

    if (!user_permissions) return null;

    return {
      org_handle,
      org_name,
      org_link_facebook,
      org_link_github,
      org_link_linkedin,
      org_link_twitter,
      org_website,
      org_published,
      org_description,
      org_country,
      org_image: org_image ? org_image : "",
      permissions: user_permissions,
    };
  } catch (e) {
    throw e;
  }
};

export const setCurrentOrgUserPermissions = (org_handle, permissions) => (
  dispatch
) => {
  try {
    dispatch({
      type: actions.SET_CURRENT_ORG_PERMISSIONS_START,
    });
    dispatch({
      type: actions.SET_CURRENT_ORG_PERMISSIONS_SUCCESS,
      payload: { org_handle, permissions },
    });
  } catch (e) {
    dispatch({
      type: actions.SET_CURRENT_ORG_PERMISSIONS_FAIL,
    });
  }
};

export const getProfileData = (organizations) => async (firebase, dispatch) => {
  try {
    let orgs = [];
    if (organizations && organizations.length > 0) {
      dispatch({ type: actions.GET_PROFILE_DATA_START });
      const promises = organizations
        .reverse()
        .map((org_handle) => getOrgBasicData(org_handle)(firebase));
      orgs = await Promise.all(promises);
      setCurrentOrgUserPermissions(
        orgs[0].org_handle,
        orgs[0].permissions
      )(dispatch);
      dispatch({
        type: actions.GET_PROFILE_DATA_SUCCESS,
        payload: { organizations: orgs },
      });
    } else {
      dispatch({ type: actions.GET_PROFILE_DATA_END });
    }
  } catch (e) {
    dispatch({ type: actions.GET_PROFILE_DATA_FAIL, payload: e.message });
  }
};

export const createOrganization = (orgData) => async (
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
        payload: { message: `Handle [${org_handle}] is already taken` },
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
        updatedAt: firestore.FieldValue.serverTimestamp(),
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
        });
    }, 7000);
  } catch (e) {
    dispatch({ type: actions.PROFILE_EDIT_FAIL, payload: e.message });
  }
};
