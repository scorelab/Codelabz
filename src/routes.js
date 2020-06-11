import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import {
  UserIsAllowedUserDashboard,
  UserIsNotAllowedUserDashboard,
} from "./auth";
import { AllowManageUser } from "./auth/manageUserAuth";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import Home from "./components/Home";
import AuthPage from "./components/AuthPage";
import Spinner from "./helpers/spinner";
import Navbar from "./components/NavBar";
import ManageUsers from "./components/ManageUsers";
import NotFound from "./components/ErrorPages/404";
import MyFeed from "./components/MyFeed";

const AuthIsLoaded = ({ children }) => {
  const profile = useSelector(({ firebase: { profile } }) => profile);
  if (!isLoaded(profile)) return <Spinner />;
  return children;
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
          <Route exact path={"*"} component={NotFound} />
        </Switch>
      </AuthIsLoaded>
    </Router>
  );
};

export default Routes;
