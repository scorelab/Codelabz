import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import { createBrowserHistory as createHistory } from "history";
import Spinner from "../helpers/spinner";
import _ from "lodash";

const locationHelper = locationHelperBuilder({});
const browserHistory = createHistory();
const unverifiedProviders = ["facebook.com", "github.com", "twitter.com"];
const verifiedProviders = ["google.com", "password"];

export const UserIsAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: "UserIsAuthenticated",
  AuthenticatingComponent: Spinner,
  allowRedirectBack: true,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/login",
  authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded &&
    !auth.isEmpty &&
    (auth.emailVerified ||
      unverifiedProviders.includes(
        _.get(auth, "providerData[0].providerId", "")
      )),
  redirectAction: (newLoc) => (dispatch) => {
    browserHistory.replace(newLoc); // or routerActions.replace
    dispatch({ type: "UNAUTHED_REDIRECT" });
  },
});

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: "UserIsNotAuthenticated",
  AuthenticatingComponent: Spinner,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/dashboard",
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) => {
    if (auth.isLoaded && !auth.isEmpty) {
      if (
        (!auth.emailVerified &&
          unverifiedProviders.includes(
            _.get(auth, "providerData[0].providerId", "")
          )) ||
        (auth.emailVerified &&
          auth.providerData &&
          verifiedProviders.includes(
            _.get(auth, "providerData[0].providerId", "")
          ))
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  },
  redirectAction: (newLoc) => (dispatch) => {
    browserHistory.replace(newLoc); // or routerActions.replace
    dispatch({ type: "UNAUTHED_REDIRECT" });
  },
});
