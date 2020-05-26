import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./auth";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import Home from "./components/Home";
import Login from "./components/Login";
import Spinner from "./helpers/spinner";

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth);
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
            component={UserIsNotAuthenticated(Login)}
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
