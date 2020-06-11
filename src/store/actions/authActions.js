import * as actions from "./actionTypes";
import _ from "lodash";
import { functions } from "../../config";

export const signIn = credentials => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.SIGN_IN_START });
    dispatch({ type: actions.CLEAR_AUTH_VERIFY_EMAIL_STATE });
    const userData = await firebase.login(credentials);
    if (_.get(userData, "user.user.emailVerified", false)) {
      dispatch({ type: actions.SIGN_IN_SUCCESS });
    } else {
      await firebase.logout();
      dispatch({
        type: actions.SET_VERIFY_EMAIL_FAIL,
        payload: credentials.email
      });
      dispatch({
        type: actions.SIGN_IN_FAIL,
        payload: "email-unverified"
      });
    }
  } catch (e) {
    dispatch({ type: actions.SIGN_IN_FAIL, payload: e.message });
  }
};

export const signInWithGoogle = () => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.SIGN_IN_START });
    await firebase.login({
      provider: "google",
      type: "popup"
    });
    dispatch({ type: actions.SIGN_IN_SUCCESS });
  } catch (e) {
    dispatch({ type: actions.SIGN_IN_FAIL, payload: e.message });
  }
};

export const signInWithProviderID = providerID => async (
  firebase,
  dispatch
) => {
  try {
    if (!["github", "twitter", "facebook"].includes(providerID)) {
      return;
    }
    dispatch({ type: actions.SIGN_IN_START });
    await firebase.login({
      provider: providerID,
      type: "popup"
    });
    dispatch({ type: actions.SIGN_IN_SUCCESS });
  } catch (e) {
    if (e.code === "auth/account-exists-with-different-credential") {
      const methods = await firebase.auth().fetchSignInMethodsForEmail(e.email);
      dispatch({
        type: actions.SIGN_IN_FAIL,
        payload: `You already have an account created using ${methods.join(
          ", "
        )}. Log in with ${methods.join(", ")} to continue.`
      });
    } else {
      dispatch({ type: actions.SIGN_IN_FAIL, payload: e });
    }
  }
};

export const signOut = () => async (firebase, history) => {
  try {
    await firebase.logout();
    history.push("/login");
  } catch (e) {
    console.log(e.message);
  }
};

export const signUp = userData => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.SIGN_UP_START });
    const { email, password } = userData;
    await firebase.createUser({ email, password }, { email });
    await firebase.logout();
    dispatch({ type: actions.SIGN_UP_SUCCESS });
  } catch (e) {
    dispatch({ type: actions.SIGN_UP_FAIL, payload: e.message });
  }
};

export const clearAuthError = () => async dispatch => {
  dispatch({ type: actions.CLEAR_AUTH_PROFILE_STATE });
  dispatch({ type: actions.CLEAR_AUTH_VERIFY_EMAIL_STATE });
};

export const clearRecoverPasswordError = () => async dispatch => {
  dispatch({ type: actions.CLEAR_AUTH_RECOVER_PASSWORD_STATE });
};

/**
 *Workflow to password reset
 * 1. call sendPasswordResetEmail with email
 * 2. call verifyPasswordResetCode with actionCode
 * 3. call confirmPasswordReset with actionCode and new password
 */

export const sendPasswordResetEmail = email => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.SEND_RESET_EMAIL_START });
    await firebase.resetPassword(email);
    dispatch({ type: actions.SEND_RESET_EMAIL_SUCCESS });
  } catch (e) {
    dispatch({ type: actions.SEND_RESET_EMAIL_FAIL, payload: e.message });
  }
};

export const verifyPasswordResetCode = actionCode => async (
  firebase,
  dispatch
) => {
  try {
    dispatch({ type: actions.VERIFY_RESET_CODE_START });
    const email = await firebase.verifyPasswordResetCode(actionCode);
    dispatch({ type: actions.VERIFY_RESET_CODE_SUCCESS, payload: email });
  } catch (e) {
    dispatch({ type: actions.VERIFY_RESET_CODE_FAIL, payload: e.message });
  }
};

export const confirmPasswordReset = ({ actionCode, password }) => async (
  firebase,
  dispatch
) => {
  try {
    dispatch({ type: actions.PASSWORD_RECOVERY_START });
    await firebase.confirmPasswordReset(actionCode, password);
    dispatch({ type: actions.PASSWORD_RECOVERY_SUCCESS });
  } catch (e) {
    dispatch({ type: actions.PASSWORD_RECOVERY_FAIL, payload: e.message });
  }
};

export const verifyEmail = actionCode => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.EMAIL_VERIFY_START });
    await firebase.auth().applyActionCode(actionCode);
    dispatch({ type: actions.EMAIL_VERIFY_SUCCESS });
  } catch (e) {
    dispatch({ type: actions.EMAIL_VERIFY_FAIL, payload: e.message });
  }
};

export const resendVerifyEmail = email => async dispatch => {
  try {
    dispatch({ type: actions.RESEND_VERIFY_EMAIL_START });
    dispatch({ type: actions.CLEAR_AUTH_PROFILE_STATE });
    const resendVerificationEmail = functions.httpsCallable(
      "resendVerificationEmail"
    );
    await resendVerificationEmail({
      email
    });
    dispatch({ type: actions.RESEND_VERIFY_EMAIL_SUCCESS });
  } catch (e) {
    dispatch({ type: actions.RESEND_VERIFY_EMAIL_FAIL, payload: e.message });
  }
};

/**
 * Check user handle exists or not
 * @param userHandle
 * @returns {function(...[*]=):boolean}
 */
export const checkUserHandleExists = userHandle => async firebase => {
  try {
    const handle = await firebase
      .ref(`/cl_user_handle/${userHandle}`)
      .once("value");
    return handle.exists();
  } catch (e) {
    throw e.message;
  }
};

export const checkOrgHandleExists = orgHandle => async firebase => {
  try {
    const organizationHandle = await firebase
      .ref(`/cl_org_handle/${orgHandle}`)
      .once("value");
    return organizationHandle.exists();
  } catch (e) {
    throw e.message;
  }
};

export const setUpInitialData = data => async (
  firebase,
  firestore,
  dispatch
) => {
  try {
    dispatch({ type: actions.INITIAL_SETUP_START });
    const userData = firebase.auth().currentUser;
    const {
      orgData,
      name: displayName,
      handle,
      country,
      org_handle,
      org_name,
      org_website,
      org_country
    } = data;

    let promises;

    if (Boolean(orgData)) {
      promises = [
        firebase.updateProfile(
          { displayName, handle, country, organizations: [org_handle] },
          { useSet: false, merge: true }
        ),
        firestore.set(
          { collection: "cl_org_general", doc: org_handle },
          {
            org_name,
            org_handle,
            org_website,
            org_country,
            org_email: userData.email,
            org_created_date: firestore.FieldValue.serverTimestamp()
          }
        )
      ];
    } else {
      promises = [
        firebase.updateProfile(
          { displayName, handle, country },
          { useSet: false, merge: true }
        )
      ];
    }

    await Promise.all(promises);
    dispatch({ type: actions.INITIAL_SETUP_SUCCESS });
  } catch (e) {
    console.log(e);
    dispatch({ type: actions.INITIAL_SETUP_FAIL, payload: e.message });
  }
};
