import * as actions from "./actionTypes";
import { actionTypes as reactReduxActionTypes } from "react-redux-firebase";
import { functions } from "../../config";

export const signIn = credentials => async (firebase, history) => {
  try {
    await firebase.login(credentials);
    history.push("/dashboard");
  } catch (e) {
    console.log(e.message);
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
    dispatch({ type: actions.SIGN_UP_FAIL, payload: e });
  }
};

export const clearAuthError = () => async dispatch => {
  dispatch({ type: reactReduxActionTypes.LOGIN_ERROR, authError: null });
  dispatch({ type: actions.CLEAR_STATE });
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
    dispatch({ type: actions.EMAIL_VERIFY_START });
    const resendVerificationEmail = functions.httpsCallable(
      "resendVerificationEmail"
    );
    await resendVerificationEmail({
      email
    });
    dispatch({ type: actions.EMAIL_VERIFY_SUCCESS });
  } catch (e) {
    dispatch({ type: actions.EMAIL_VERIFY_FAIL, payload: e.message });
  }
};
