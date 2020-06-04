import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./auth";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import Home from "./components/Home";
import AuthPage from "./components/AuthPage";
import Spinner from "./helpers/spinner";
import Login from "./components/AuthPage/Login";
import SignUp from "./components/AuthPage/SignUp";

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(({ firebase }) => firebase.auth);
  if (!isLoaded(auth)) return <Spinner />;
  return children;
};

const Routes = () => {
  return (
    <Router>
      <AuthIsLoaded>
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route
            exact
            path={"/login"}
            authType={"login"}
            component={UserIsNotAuthenticated(AuthPage(<Login />, "login"))}
          />
          <Route
            exact
            path={"/signup"}
            component={UserIsNotAuthenticated(AuthPage(<SignUp />, "signup"))}
          />
          <Route
            exact
            path={"/dashboard"}
            component={UserIsAuthenticated(Dashboard)}
          />
        </Switch>
      </AuthIsLoaded>
    </Router>
  );
};

export default Routes;
