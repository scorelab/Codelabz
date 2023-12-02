import * as actions from "./actionTypes";
import _ from "lodash";
import { functions } from "../../config";

export const signIn = (credentials) => async (firebase, dispatch) => {

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
        payload: credentials.email,
      });
      dispatch({
        type: actions.SIGN_IN_FAIL,
        payload: "email-unverified",
      });
    }
  } catch (e) {

    dispatch({ type: actions.SIGN_IN_FAIL, payload: e });
  }
};

export const signInWithGoogle = () => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.SIGN_IN_START });
    await firebase.login({
      provider: "google",
      type: "popup",
    });
    dispatch({ type: actions.SIGN_IN_SUCCESS });
    window.location.href = '/dashboard';
  } catch (e) {
    dispatch({ type: actions.SIGN_IN_FAIL, payload: e });
  }
};

export const signInWithProviderID =
  (providerID) => async (firebase, dispatch) => {

    try {
      if (!["github", "twitter", "facebook"].includes(providerID)) {
        return;
      }
      dispatch({ type: actions.SIGN_IN_START });
      await firebase.login({
        provider: providerID,
        type: "popup",
      });
      dispatch({ type: actions.SIGN_IN_SUCCESS });
      window.location.href = '/dashboard';
    } catch (e) {
      if (e.code === "auth/account-exists-with-different-credential") {
        const methods = await firebase
          .auth()
          .fetchSignInMethodsForEmail(e.email);
        dispatch({
          type: actions.SIGN_IN_FAIL,
          payload: `You already have an account created using ${methods.join(
            ", "
          )}. Log in with ${methods.join(", ")} to continue.`,
        });
      } else {
        dispatch({ type: actions.SIGN_IN_FAIL, payload: e });

      }
    }
  };

export const signOut = () => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.CLEAR_AUTH_PROFILE_STATE });
    dispatch({ type: actions.CLEAR_AUTH_VERIFY_EMAIL_STATE });
    dispatch({ type: actions.CLEAR_AUTH_RECOVER_PASSWORD_STATE });
    dispatch({ type: actions.CLEAR_PROFILE_EDIT_STATE });
    dispatch({ type: actions.CLEAR_PROFILE_DATA_STATE });
    dispatch({ type: actions.CLEAR_ORG_GENERAL_STATE });
    dispatch({ type: actions.CLEAR_ORG_USER_STATE });
    await firebase.logout();
    window.location.href = "/login";
    // window.location.reload();
  } catch (e) {
    console.log(e.message);
  }
};

export const signUp = (userData) => async (firebase, dispatch) => {
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

export const clearAuthError = () => async (dispatch) => {
  dispatch({ type: actions.CLEAR_AUTH_PROFILE_STATE });
  dispatch({ type: actions.CLEAR_AUTH_VERIFY_EMAIL_STATE });
};

export const clearRecoverPasswordError = () => async (dispatch) => {
  dispatch({ type: actions.CLEAR_AUTH_RECOVER_PASSWORD_STATE });
};

/**
 *Workflow to password reset
 * 1. call sendPasswordResetEmail with email
 * 2. call verifyPasswordResetCode with actionCode
 * 3. call confirmPasswordReset with actionCode and new password
 */

export const sendPasswordResetEmail = (email) => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.SEND_RESET_EMAIL_START });
    await firebase.resetPassword(email);
    dispatch({ type: actions.SEND_RESET_EMAIL_SUCCESS });
  } catch (e) {
    dispatch({ type: actions.SEND_RESET_EMAIL_FAIL, payload: e });
  }
};

export const verifyPasswordResetCode =
  (actionCode) => async (firebase, dispatch) => {
    try {
      dispatch({ type: actions.VERIFY_RESET_CODE_START });
      const email = await firebase.verifyPasswordResetCode(actionCode);
      dispatch({ type: actions.VERIFY_RESET_CODE_SUCCESS, payload: email });
    } catch (e) {
      dispatch({ type: actions.VERIFY_RESET_CODE_FAIL, payload: e.message });
    }
  };

export const confirmPasswordReset =
  ({ actionCode, password }) =>
    async (firebase, dispatch) => {
      try {
        dispatch({ type: actions.PASSWORD_RECOVERY_START });
        await firebase.confirmPasswordReset(actionCode, password);
        dispatch({ type: actions.PASSWORD_RECOVERY_SUCCESS });
      } catch (e) {
        dispatch({ type: actions.PASSWORD_RECOVERY_FAIL, payload: e.message });
      }
    };

export const verifyEmail = (actionCode) => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.EMAIL_VERIFY_START });
    await firebase.auth().applyActionCode(actionCode);
    dispatch({ type: actions.EMAIL_VERIFY_SUCCESS });
  } catch (e) {
    dispatch({ type: actions.EMAIL_VERIFY_FAIL, payload: e.message });
  }
};

export const resendVerifyEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: actions.RESEND_VERIFY_EMAIL_START });
    dispatch({ type: actions.CLEAR_AUTH_PROFILE_STATE });
    const resendVerificationEmail = functions.httpsCallable(
      "resendVerificationEmail"
    );
    await resendVerificationEmail({
      email,
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
export const checkUserHandleExists = (userHandle) => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.VERIFY_USER_HANDLE_EXISTS_START });
    const handle = await firebase
      .firestore()
      .collection("cl_user")
      .get();

    const records = handle.docs.map(doc => doc.data())

    let handleExists = false

    records.forEach(function (record) {
      if (userHandle == record.handle) {
        handleExists = true
      }
    })
    dispatch({ type: actions.VERIFY_USER_HANDLE_EXISTS_SUCCESS });
    return handleExists

  } catch (e) {
    dispatch({ type: actions.VERIFY_USER_HANDLE_EXISTS_FAIL });
    throw e.message;
  }
};

export const checkAdminExists = (adminHandle, org_handle) => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.VERIFY_ADMIN_HANDLE_EXISTS_START });
    const handle = await firebase
      .firestore()
      .collection("cl_org_general")
      .doc(org_handle)
      .collection("admins")
      .get()

    const records = handle.docs.map(doc => doc.data())
    let adminHandleExists = false
    records.forEach(function (record) {
      if (adminHandle == record.adminHandle) {
        adminHandleExists = true
      }
    })
    dispatch({ type: actions.VERIFY_ADMIN_HANDLE_EXISTS_SUCCESS });
    return adminHandleExists
  } catch (e) {
    dispatch({ type: actions.VERIFY_ADMIN_HANDLE_EXISTS_FAIL });
    throw e.message;
  }
}
export const checkAdminEmail = (adminHandle,adminEmail) => async (firebase, dispatch) => {
  try {
    dispatch({ type: actions.CHECK_ADMIN_EMAIL_START });
    const email = await firebase
      .firestore()
      .collection("cl_user")
      .where("handle", "==", adminHandle)
      .get()
    let email_registered = false
    if (!email.empty) {

      const firstDocument = email.docs[0];
      const emailData = firstDocument.data();
      const emailId = emailData.email;

      if(emailId == adminEmail){
        email_registered=true
      }
    }
    dispatch({ type: actions.CHECK_ADMIN_EMAIL_SUCCESS });
    return email_registered
  } catch (e) {
    dispatch({ type: actions.CHECK_ADMIN_EMAIL_FAIL });
    throw e.message;
  }
}



export const checkOrgHandleExists = (orgHandle) => async (firebase) => {
  try {
    const organizationHandle = await firebase
      .firestore()
      .collection("cl_org_general")
      .doc(orgHandle)
      .get();

    console.log(organizationHandle);
    return organizationHandle.exists;
  } catch (e) {
    throw e.message;
  }
};

export const setUpInitialData =
  (data) => async (firebase, firestore, dispatch) => {
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
        org_country,
      } = data;

      const isUserHandleExists = await checkUserHandleExists(handle)(firebase,dispatch);

      if (isUserHandleExists) {
        dispatch({
          type: actions.INITIAL_SETUP_FAIL,
          payload: { message: `Handle [${handle}] is already taken` },
        });
        return;
      }

      if (Boolean(orgData)) {
        const isOrgHandleExists = await checkOrgHandleExists(org_handle)(
          firebase
        );

        if (isOrgHandleExists) {
          dispatch({
            type: actions.INITIAL_SETUP_FAIL,
            payload: { message: `Handle [${org_handle}] is already taken` },
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
            updatedAt: firestore.FieldValue.serverTimestamp(),
          }
        );

        const timeOutID = setTimeout(() => {
          firebase
            .updateProfile(
              {
                displayName,
                handle,
                country,
                organizations: [org_handle],
                updatedAt: firestore.FieldValue.serverTimestamp(),
              },
              { useSet: false, merge: true }
            )
            .then(() => {
              window.location.reload();
              clearTimeout(timeOutID);
              dispatch({ type: actions.INITIAL_SETUP_SUCCESS });
            });
        }, 7000);
      } else {
        await firebase.updateProfile(
          {
            displayName,
            handle,
            country,
            organizations: [],
            updatedAt: firestore.FieldValue.serverTimestamp(),
          },
          { useSet: false, merge: true }
        );
        dispatch({ type: actions.INITIAL_SETUP_SUCCESS });
      }
    } catch (e) {
      console.log(e);
      dispatch({ type: actions.INITIAL_SETUP_FAIL, payload: e });
    }
  };
