import * as actions from "./actionTypes";
import { actionTypes as reactReduxActionTypes } from "react-redux-firebase";

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

export const recoverPassword = email => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.RECOVERY_START });
    await firebase.auth().sendPasswordResetEmail(email);
    dispatch({ type: actions.RECOVERY_SUCCESS });
  } catch (e) {
    dispatch({ type: actions.RECOVERY_FAIL, payload: e.message });
  }
};

export const resetPassword = ({ actionCode, password }) => async (
  firebase,
  dispatch
) => {
  try {
    await firebase.auth().confirmPasswordReset(actionCode, password);
  } catch (e) {
    dispatch({ type: actions.RECOVERY_FAIL, payload: e.message });
  }
};

export const verifyEmail = actionCode => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.RECOVERY_START });
    await firebase.auth().applyActionCode(actionCode);
    dispatch({ type: actions.RECOVERY_SUCCESS });
  } catch (e) {
    dispatch({ type: actions.RECOVERY_FAIL, payload: e.message });
  }
};
