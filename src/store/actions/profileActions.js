import * as actions from "./actionTypes";
import { checkOrgHandleExists, checkUserHandleExists } from "./authActions";
import { getOrgBasicData } from "./orgActions";
import _ from "lodash";

export const clearProfileEditError = () => async dispatch => {
  dispatch({ type: actions.CLEAR_PROFILE_EDIT_STATE });
};

export const setCurrentOrgUserPermissions =
  (org_handle, permissions) => dispatch => {
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

export const getProfileData = () => async (firebase, firestore, dispatch) => {
  try {
    dispatch({ type: actions.GET_PROFILE_DATA_START });
    const userOrgs = await getAllOrgsOfCurrentUser()(
      firebase,
      firestore,
      dispatch
    );
    const organizations = userOrgs?.map(org => org.org_handle);
    // console.log(organizations);
    if (organizations && organizations.length > 0) {
      const promises = organizations.map(org_handle =>
        getOrgBasicData(org_handle)(firebase)
      );
      const orgs = await Promise.all(promises);
      setCurrentOrgUserPermissions(
        orgs[0].org_handle,
        orgs[0].permissions
      )(dispatch);
      dispatch({
        type: actions.GET_PROFILE_DATA_SUCCESS,
        payload: { organizations: _.orderBy(orgs, ["permissions"], ["desc"]) }
      });
    } else {
      dispatch({ type: actions.GET_PROFILE_DATA_END });
    }
  } catch (e) {
    dispatch({ type: actions.GET_PROFILE_DATA_FAIL, payload: e.message });
  }
};

export const createOrganization =
  orgData => async (firebase, firestore, dispatch) => {
    try {
      dispatch({ type: actions.PROFILE_EDIT_START });
      const userData = firebase.auth().currentUser;
      const { org_name, org_handle, org_country, org_website } = orgData;
      const isOrgHandleExists = await checkOrgHandleExists(org_handle)(
        firebase
      );

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
          .update({
            organizations: firestore.FieldValue.arrayUnion(org_handle)
          })
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

export const updateUserProfile =
  ({
    displayName,
    website,
    link_facebook,
    link_github,
    link_linkedin,
    link_twitter,
    description,
    country
  }) =>
  async (firebase, firestore, dispatch) => {
    try {
      dispatch({ type: actions.PROFILE_EDIT_START });
      await firebase.updateProfile(
        {
          displayName,
          description,
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

export const uploadProfileImage =
  (file, user_handle) => async (firebase, dispatch) => {
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

export const getUserProfileData =
  handle => async (firebase, firestore, dispatch) => {
    try {
      dispatch({ type: actions.GET_USER_DATA_START });
      const isUserExists = await checkUserHandleExists(handle)(firestore);
      if (isUserExists) {
        const docs = await firestore
          .collection("cl_user")
          .where("handle", "==", handle)
          .get();
        const doc = docs.docs[0].data();
        const currentUserId = firebase.auth().currentUser.uid;
        const followingStatus = await isUserFollower(
          currentUserId,
          doc.uid,
          firestore
        );
        dispatch({
          type: actions.GET_USER_DATA_SUCCESS,
          payload: { ...doc, isFollowing: followingStatus }
        });
      } else {
        dispatch({ type: actions.GET_USER_DATA_SUCCESS, payload: false });
      }
    } catch (e) {
      dispatch({ type: actions.GET_USER_DATA_FAIL, payload: e.message });
    }
  };

export const clearUserProfile = () => dispatch => {
  dispatch({ type: actions.CLEAR_USER_PROFILE_DATA_STATE });
};

export const isUserFollower = async (followerId, followingId, firestore) => {
  const followerDoc = await firestore
    .collection("user_followers")
    .doc(`${followingId}_${followerId}`)
    .get();
  return followerDoc.exists;
};

export const addUserFollower = async (
  currentProfileData,
  profileData,
  firestore
) => {
  try {
    const followStatus = await isUserFollower(
      currentProfileData.uid,
      profileData.uid,
      firestore
    );
    if (followStatus === false) {
      await firestore
        .collection("user_followers")
        .doc(`${profileData.uid}_${currentProfileData.uid}`)
        .set({
          followingId: profileData.uid,
          followerId: currentProfileData.uid
        });

      await firestore
        .collection("cl_user")
        .doc(profileData.uid)
        .update({
          followerCount: firestore.FieldValue
            ? firestore.FieldValue.increment(1)
            : 1
        });

      await firestore
        .collection("cl_user")
        .doc(currentProfileData.uid)
        .update({
          followingCount: firestore.FieldValue
            ? firestore.FieldValue.increment(1)
            : 1
        });
    }
  } catch (e) {
    console.log(e);
  }
};

export const removeUserFollower = async (
  currentProfileData,
  profileData,
  firestore
) => {
  try {
    const followStatus = await isUserFollower(
      currentProfileData.uid,
      profileData.uid,
      firestore
    );
    if (followStatus === true) {
      await firestore
        .collection("user_followers")
        .doc(`${profileData.uid}_${currentProfileData.uid}`)
        .delete();

      await firestore
        .collection("cl_user")
        .doc(profileData.uid)
        .update({
          followerCount: firestore.FieldValue
            ? firestore.FieldValue.increment(-1)
            : 0
        });

      await firestore
        .collection("cl_user")
        .doc(currentProfileData.uid)
        .update({
          followingCount: firestore.FieldValue
            ? firestore.FieldValue.increment(-1)
            : 0
        });
    }
  } catch (e) {
    console.log(e);
  }
};

const getAllOrgsOfCurrentUser = () => async (firebase, firestore) => {
  try {
    const auth = firebase.auth().currentUser;
    if (auth === null) return [];
    const orgUsersDocs = await firestore
      .collection("org_users")
      .where("uid", "==", auth.uid)
      .get();

    const userOrgs = orgUsersDocs.docs.map(orgUserDoc => orgUserDoc.data());

    return userOrgs;
  } catch (e) {
    console.log(e);
  }
};
