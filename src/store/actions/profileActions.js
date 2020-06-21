import * as actions from "./actionTypes";

export const clearProfileEditError = () => async dispatch => {
  dispatch({ type: actions.CLEAR_PROFILE_EDIT_STATE });
};

const getOrgBasicData = org_handle => async firebase => {
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

    const user_permissions = orgPermissionDoc.get(uid);

    if (!user_permissions) return null;

    return {
      org_handle,
      org_name,
      org_image: org_image ? org_image : "",
      permissions: user_permissions
    };
  } catch (e) {
    throw e;
  }
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
        payload: { organizations: orgs }
      });
    } else {
      dispatch({ type: actions.GET_PROFILE_DATA_END });
    }
  } catch (e) {
    dispatch({ type: actions.GET_PROFILE_DATA_FAIL, payload: e.message });
  }
};
