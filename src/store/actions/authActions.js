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
    if (!["github", "twitter"].includes(providerID)) {
      return;
    }
    dispatch({ type: actions.SIGN_IN_START });
    const userData = await firebase.login({
      provider: providerID,
      type: "popup"
    });
    if (_.get(userData, "user.emailVerified", false)) {
      dispatch({ type: actions.SIGN_IN_SUCCESS });
    } else {
      await firebase.logout();
      dispatch({
        type: actions.SET_VERIFY_EMAIL_FAIL,
        payload: _.get(userData, "user.email", "")
      });
      dispatch({
        type: actions.SIGN_IN_FAIL,
        payload: "email-unverified"
      });
    }
  } catch (e) {
    if (e.code === "auth/account-exists-with-different-credential") {
      const methods = await firebase.auth().fetchSignInMethodsForEmail(e.email);
      dispatch({
        type: actions.SIGN_IN_FAIL,
        payload: `An account already exists with the same email address with provider(s) ${methods.join(
          ", "
        )}. Sign in using a provider associated with this email address.`
      });
    } else {
      dispatch({ type: actions.SIGN_IN_FAIL, payload: e.message });
    }
  }
};

export const signOut = () => async firebase => {
  try {
    await firebase.logout();
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
