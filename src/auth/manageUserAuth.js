import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import { createBrowserHistory as createHistory } from "history";
import Spinner from "../helpers/spinner";
import queryString from "query-string";

const locationHelper = locationHelperBuilder({});
const browserHistory = createHistory();

export const AllowManageUser = connectedRouterRedirect({
  wrapperDisplayName: "AllowManageUser",
  AuthenticatingComponent: Spinner,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/",
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }, ownProps) => {
    const { mode } = queryString.parse(ownProps.location.search);
    return (
      ((auth.isLoaded && auth.isEmpty) || !auth.emailVerified) &&
      (mode === "resetPassword" || mode === "verifyEmail")
    );
  },
  redirectAction: newLoc => dispatch => {
    browserHistory.replace(newLoc); // or routerActions.replace
    dispatch({ type: "UNAUTHED_REDIRECT" });
  }
});
