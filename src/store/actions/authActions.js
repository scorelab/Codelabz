import * as actions from "./actionTypes";

export const signIn = credentials => async (firebase, history) => {
  try {
    await firebase.login(credentials);
    history.push("/dashboard");
  } catch (e) {
    console.log(e.message);
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
    const { us_email: email, us_password: password } = userData;
    await firebase.createUser({ email, password }, { email });
    await firebase.logout();
    dispatch({ type: actions.SIGN_UP_SUCCESS });
  } catch (e) {
    dispatch({ type: actions.SIGN_UP_FAIL, payload: e.message });
    console.log(e.message);
  }
};
