import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import {
  UserIsAllowedUserDashboard,
  UserIsNotAllowedUserDashboard,
  UserIsAllowOrgManager,
} from "./auth";
import { AllowManageUser } from "./auth/manageUserAuth";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import Home from "./components/Home";
import AuthPage from "./components/AuthPage";
import Spinner from "./helpers/spinner";
import Navbar from "./components/NavBar";
import ManageUsers from "./components/ManageUsers";
import NotFound from "./components/ErrorPages/404";
import MyFeed from "./components/MyFeed";
import Footer from "./components/Footer";
import Organization from "./components/Organization";
import Profile from "./components/Profile";
import ViewTutorial from "./components/Tutorials";
import ProfileView from "./components/Profile/ViewProfile";
import ViewOrganization from "./components/Organization/ViewOrganization";
import Editor from "./components/Editor";

const AuthIsLoaded = ({ children }) => {
  const profile = useSelector(({ firebase: { profile } }) => profile);
  const data = useSelector(({ profile: { data } }) => data);
  const general = useSelector(({ org: { general } }) => general);

  //case for not logged in user
  if (
    isLoaded(profile) &&
    isEmpty(profile) &&
    isLoaded(data) &&
    isEmpty(data) &&
    isLoaded(general) &&
    isEmpty(general)
  )
    return children;

  //case for logged in uncompleted user
  if (
    isLoaded(profile) &&
    !isEmpty(profile) &&
    isLoaded(data) &&
    isEmpty(data) &&
    isLoaded(general) &&
    isEmpty(general)
  )
    return children;

  //case for authed org user
  if (
    isLoaded(profile) &&
    !isEmpty(profile) &&
    isLoaded(data) &&
    !isEmpty(data) &&
    isLoaded(general) &&
    !isEmpty(general)
  )
    return children;

  //case for authed normal user
  if (
    isLoaded(profile) &&
    !isEmpty(profile) &&
    isLoaded(data) &&
    isEmpty(data) &&
    isLoaded(general) &&
    isEmpty(general)
  )
    return children;

  return <Spinner />;
};

// Remember to add the paths that the MINI navbar should
// be shown in components/NavBar/navbarPaths.js

const Routes = () => {
  return (
    <Router>
      <AuthIsLoaded>
        <Navbar />
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route
            exact
            path={"/login"}
            render={(props) => <AuthPage {...props} type={"login"} />}
          />
          <Route
            exact
            path={"/signup"}
            render={(props) => <AuthPage {...props} type={"signup"} />}
          />
          <Route
            exact
            path={"/forgotpassword"}
            render={(props) => <AuthPage {...props} type={"forgotpassword"} />}
          />
          <Route
            exact
            path={"/manageusers"}
            component={AllowManageUser(ManageUsers)}
          />
          <Route
            exact
            path={"/dashboard"}
            component={UserIsNotAllowedUserDashboard(Dashboard)}
          />
          <Route
            exact
            path={"/dashboard/my_feed"}
            component={UserIsAllowedUserDashboard(MyFeed)}
          />
          <Route
            exact
            path={"/profile"}
            component={UserIsAllowedUserDashboard(Profile)}
          />
          <Route
            exact
            path={"/organization"}
            component={UserIsAllowOrgManager(Organization)}
          />
          <Route
            exact
            path={"/tutorials"}
            component={UserIsAllowedUserDashboard(ViewTutorial)}
          />
          <Route
            exact
            path={"/user/:handle"}
            component={UserIsAllowedUserDashboard(ProfileView)}
          />
          <Route
            exact
            path={"/org/:handle"}
            component={UserIsAllowedUserDashboard(ViewOrganization)}
          />
          <Route
            exact
            path={"/editor"}
            component={UserIsAllowedUserDashboard(Editor)}
          />
          <Route exact path={"*"} component={NotFound} />
        </Switch>
        <Footer />
      </AuthIsLoaded>
    </Router>
  );
};

export default Routes;
