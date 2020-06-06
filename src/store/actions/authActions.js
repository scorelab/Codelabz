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
        type: actions.SIGN_IN_FAIL,
        payload: "email-unverified"
      });
    }
  } catch (e) {
    dispatch({ type: actions.SIGN_IN_FAIL, payload: e.message });
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

/**
 *Workflow to password reset
 * 1. call sendPasswordResetEmail with email
 * 2. call verifyPasswordResetCode with actionCode
 * 3. call confirmPasswordReset with actionCode and new password
 */

export const sendPasswordResetEmail = email => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.RECOVERY_START });
    await firebase.resetPassword(email);
    dispatch({ type: actions.RECOVERY_SUCCESS });
  } catch (e) {
    dispatch({ type: actions.RECOVERY_FAIL, payload: e.message });
  }
};

export const verifyPasswordResetCode = actionCode => async (
  firebase,
  dispatch
) => {
  try {
    dispatch({ type: actions.RECOVERY_START });
    const response = await firebase.verifyPasswordResetCode(actionCode);
    dispatch({ type: actions.RECOVERY_SUCCESS, payload: response });
  } catch (e) {
    dispatch({ type: actions.RECOVERY_FAIL, payload: e.message });
  }
};

export const confirmPasswordReset = ({ actionCode, password }) => async (
  firebase,
  dispatch
) => {
  try {
    await firebase.confirmPasswordReset(actionCode, password);
  } catch (e) {
    dispatch({ type: actions.RECOVERY_FAIL, payload: e.message });
  }
};

/**
 *Workflow to verify an email
 * 1. call checkActionCode with actionCode
 * 2. call verifyEmail with actionCode
 */

export const checkActionCode = actionCode => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.EMAIL_VERIFY_START });
    const response = await firebase.auth().checkActionCode(actionCode);
    dispatch({ type: actions.EMAIL_VERIFY_SUCCESS, payload: response });
  } catch (e) {
    dispatch({ type: actions.EMAIL_VERIFY_FAIL, payload: e.message });
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
