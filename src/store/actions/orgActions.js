import * as actions from "./actionTypes";
import _ from "lodash";

export const getOrgUserData = org_handle => async (firestore, dispatch) => {
  try {
    dispatch({ type: actions.GET_ORG_USER_DATA_START });
    const usersDoc = await firestore
      .collection("cl_org_general")
      .doc(org_handle)
      .collection("cl_org_users")
      .doc("users")
      .get();
    const usersData = usersDoc.data();
    const users = _.omit(usersData, ["createdAt", "updatedAt"]);
    const promises = Object.keys(users).map(async uid => {
      let userDoc = await firestore
        .collection("cl_user")
        .doc(uid)
        .get();
      return {
        name: userDoc.get("displayName"),
        handle: userDoc.get("handle"),
        image: userDoc.get("photoURL"),
        permission_level: users[uid]
      };
    });
    const userData = await Promise.all(promises);
    dispatch({
      type: actions.GET_ORG_USER_DATA_SUCCESS,
      payload: _.orderBy(userData, ["permission_level"], ["desc"])
    });
  } catch (e) {
    dispatch({ type: actions.GET_ORG_USER_DATA_FAIL, payload: e.message });
  }
};

export const addOrgUser = ({ org_handle, handle, permissions }) => async (
  firestore,
  dispatch
) => {
  try {
    dispatch({ type: actions.ADD_ORG_USER_START });
    const userDoc = await firestore
      .collection("cl_user")
      .where("handle", "==", handle)
      .get();
    if (userDoc.docs.length === 1) {
      const uid = userDoc.docs[0].get("uid");
      await firestore
        .collection("cl_org_general")
        .doc(org_handle)
        .collection("cl_org_users")
        .doc("users")
        .update({
          [uid]: [permissions],
          updatedAt: firestore.FieldValue.serverTimestamp()
        });

      await getOrgUserData(org_handle)(firestore, dispatch);
      dispatch({ type: actions.ADD_ORG_USER_SUCCESS });
    } else {
      dispatch({
        type: actions.ADD_ORG_USER_FAIL,
        payload: `User [${handle}] is not registered with CodeLabz`
      });
    }
  } catch (e) {
    dispatch({ type: actions.ADD_ORG_USER_FAIL, payload: e.message });
  }
};

export const removeOrgUser = ({ org_handle, handle }) => async (
  firestore,
  dispatch
) => {
  try {
    dispatch({ type: actions.ADD_ORG_USER_START });
    const userDoc = await firestore
      .collection("cl_user")
      .where("handle", "==", handle)
      .get();
    if (userDoc.docs.length === 1) {
      const uid = userDoc.docs[0].get("uid");
      await firestore
        .collection("cl_org_general")
        .doc(org_handle)
        .collection("cl_org_users")
        .doc("users")
        .update({
          [uid]: firestore.FieldValue.delete(),
          updatedAt: firestore.FieldValue.serverTimestamp()
        });

      await getOrgUserData(org_handle)(firestore, dispatch);
      dispatch({ type: actions.ADD_ORG_USER_SUCCESS });
    } else {
      dispatch({
        type: actions.ADD_ORG_USER_FAIL,
        payload: `User [${handle}] is not registered with CodeLabz`
      });
    }
  } catch (e) {
    dispatch({ type: actions.ADD_ORG_USER_FAIL, payload: e.message });
  }
};
