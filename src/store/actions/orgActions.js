import * as actions from "./actionTypes";
import _ from "lodash";

export const setCurrentOrg = org_handle => dispatch => {
  dispatch({ type: actions.SET_CURRENT_ORG, payload: org_handle });
};

export const setCurrentOrgPermissions = permissions => dispatch => {
  dispatch({ type: actions.SET_CURRENT_ORG_PERMISSIONS, payload: permissions });
};

export const getOrgBasicData = org_handle => async firebase => {
  try {
    const firestore = firebase.firestore();
    const {
      currentUser: { uid }
    } = firebase.auth();
    const orgDoc = await firestore
      .collection("cl_org_general")
      .doc(org_handle)
      .get();

    if (!orgDoc.exists) return null;

    const org_name = orgDoc.get("org_name");
    const org_image = orgDoc.get("org_image");

    const orgPermissionDoc = await firestore
      .collection("cl_org_general")
      .doc(org_handle)
      .collection("cl_org_users")
      .doc("users")
      .get();

    if (!orgPermissionDoc.exists) return null;

    const users = orgPermissionDoc.get("users");

    if (!users || users.length <= 0) return null;

    const user_permissions = _.find(users, user => user[uid] && user[uid]);

    if (!user_permissions) return null;

    return {
      org_handle,
      org_name,
      org_image: org_image ? org_image : "",
      permissions: user_permissions[uid]
    };
  } catch (e) {
    throw e;
  }
};
