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
    dispatch({ type: actions.SIGN_UP_FAIL });
  }
};

export const clearAuthError = () => async dispatch => {
  dispatch({ type: reactReduxActionTypes.LOGIN_ERROR, authError: null });
};
