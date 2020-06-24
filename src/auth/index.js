import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import { createBrowserHistory as createHistory } from "history";
import Spinner from "../helpers/spinner";
import _ from "lodash";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { compose } from "redux";

const locationHelper = locationHelperBuilder({});
const browserHistory = createHistory();
const unverifiedProviders = ["facebook.com", "github.com", "twitter.com"];
const verifiedProviders = ["google.com", "password"];

/**
 *This auth wrapper is used to check whether the user is logged on.
 * This auth wrapper is not a hoc, and must not used directly with a route.
 * Use UserIsAllowedUserDashboard hoc for basic route protection where,
 * the user is logged in and has completed the registration workflow.
 * If the user is logged in then this wrapper would pass to the next auth wrapper,
 * it the user is not logged in then the user is redirected to /login page.
 */
const UserIsAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: "UserIsAuthenticated",
  AuthenticatingComponent: Spinner,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/login",
  authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) => {
    return !isLoaded(auth) || isInitializing === true;
  },
  authenticatedSelector: ({ firebase: { auth } }) =>
    authenticatedSelectorForAuthenticated(auth),
  redirectAction: newLoc => dispatch => {
    browserHistory.replace(newLoc); // or routerActions.replace
    dispatch({ type: "UNAUTHED_REDIRECT" });
  }
});

/**
 * This is a auth wrapper hoc for check whether the user is not logged in.
 * If the user is logged in then the user is redirected to /dashboard page.
 * If the user is not logged in, then the routes will be accessible.
 */
export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: "UserIsNotAuthenticated",
  AuthenticatingComponent: Spinner,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/dashboard",
  authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
    (!isLoaded(auth) || isInitializing === true) && isLoaded(profile),
  authenticatedSelector: ({ firebase: { auth } }) =>
    authenticatedSelectorForNotAuthenticated(auth),
  redirectAction: newLoc => dispatch => {
    browserHistory.replace(newLoc); // or routerActions.replace
    dispatch({ type: "UNAUTHED_REDIRECT" });
  }
});

/**
 * This auth wrapper is used for check if the user has completed the
 * basic work flow in registration.
 * This wrapper must be used in combination of UserIsAuthenticated, by using
 * redux compose.
 * If the user has completed the workflow, then the user will be taken to the protected route.
 * If the user has not completed the workflow, then the user will be redirected to the workflow page /dashboard.
 */
const UserIsAllowedDashboard = connectedRouterRedirect({
  wrapperDisplayName: "UserIsAllowedDashboard",
  AuthenticatingComponent: Spinner,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/dashboard",
  authenticatingSelector: ({ firebase: { profile } }) => {
    return Boolean(!profile.uid);
  },
  authenticatedSelector: ({ firebase: { profile } }) =>
    authenticatedSelectorForAllowedDashboard(profile),
  redirectAction: newLoc => dispatch => {
    browserHistory.replace(newLoc); // or routerActions.replace
    dispatch({ type: "UNAUTHED_REDIRECT" });
  }
});

/**
 * This auth wrapper is used for check if the user has not completed the
 * basic work flow in registration.
 * This wrapper must be used in combination of UserIsAuthenticated, by using
 * redux compose.
 * If the user has not completed the workflow then they will be taken to the route,
 * If the user completed the workflow then the user will be redirected to /dashboard/my_feed
 */
const UserIsNotAllowedDashboard = connectedRouterRedirect({
  wrapperDisplayName: "UserIsNotAllowedDashboard",
  AuthenticatingComponent: Spinner,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/dashboard/my_feed",
  authenticatingSelector: ({ firebase: { profile } }) => {
    return Boolean(!profile.uid);
  },
  authenticatedSelector: ({ firebase: { profile } }) =>
    !authenticatedSelectorForAllowedDashboard(profile),
  redirectAction: newLoc => dispatch => {
    browserHistory.replace(newLoc); // or routerActions.replace
    dispatch({ type: "UNAUTHED_REDIRECT" });
  }
});

const AllowOrgManager = connectedRouterRedirect({
  wrapperDisplayName: "AllowOrgManager",
  AuthenticatingComponent: Spinner,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/",
  authenticatingSelector: ({
    firebase: { profile },
    profile: { data },
    org: { general }
  }) => {
    return !(
      isLoaded(data) &&
      !isEmpty(data) &&
      isLoaded(general) &&
      !isEmpty(general) &&
      isLoaded(profile) &&
      !isEmpty(profile)
    );
  },
  authenticatedSelector: ({
    org: {
      general: { permissions }
    }
  }) => {
    return [0, 1, 2, 3].some(e => permissions.includes(e));
  },
  redirectAction: newLoc => dispatch => {
    browserHistory.replace(newLoc); // or routerActions.replace
    dispatch({ type: "UNAUTHED_REDIRECT" });
  }
});

const authenticatedSelectorForNotAuthenticated = auth =>
  isLoaded(auth) && !isEmpty(auth)
    ? !(
        (!auth.emailVerified &&
          unverifiedProviders.includes(
            _.get(auth, "providerData[0].providerId", "")
          )) ||
        (auth.emailVerified &&
          auth.providerData &&
          verifiedProviders.includes(
            _.get(auth, "providerData[0].providerId", "")
          ))
      )
    : true;

const authenticatedSelectorForAuthenticated = auth =>
  isLoaded(auth) &&
  !isEmpty(auth) &&
  (auth.emailVerified ||
    unverifiedProviders.includes(
      _.get(auth, "providerData[0].providerId", "")
    ));

const authenticatedSelectorForAllowedDashboard = profile => {
  return Boolean(_.get(profile, "handle", false));
};

/**
 * This is the hoc for check whether the route is
 * accessible to a user who has completed the basic work flow of
 * registration
 * This hoc will first check whether the user is logged in and then it
 * will check if the user has completed the workflow
 */
export const UserIsAllowedUserDashboard = compose(
  UserIsAuthenticated,
  UserIsAllowedDashboard
);

/**
 * This is the hoc for check whether the route is
 * accessible to a user who has not completed the basic work flow of
 * registration
 * This hoc will first check whether the user is logged in and then it
 * will check if the user has not completed the workflow
 */
export const UserIsNotAllowedUserDashboard = compose(
  UserIsAuthenticated,
  UserIsNotAllowedDashboard
);

export const UserIsAllowOrgManager = compose(
  UserIsAllowedUserDashboard,
  AllowOrgManager
);

/**
 * when the user is logged in the user will be default redirected to /dashboard then
 * if the user has completed the workflow, the user will be redirected to /dashboard/my_feed,
 * if the user has not completed the workflow, the user must completed the workflow
 * to move to another protected route
 */
