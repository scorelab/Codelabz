import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import navbarPaths from "./navbarPaths";
import { useAuthStatus } from "../../helpers/customHooks";
import { useSelector } from "react-redux";
import MainNavbar from "./new/MainNavbar";
import MiniNavbar from "./new/MiniNavbar";
import { useFirebase } from "react-redux-firebase";

const Navbar = () => {
  const profile = useSelector(({ firebase: { profile } }) => profile);
  let { pathname: location } = useLocation();
  const [render, setRender] = useState("main");
  const authed = useAuthStatus();
  const history = useHistory();

  useEffect(() => {
    if (
      profile &&
      profile.organizations &&
      profile.organizations.length === 0 &&
      location === "/organization"
    ) {
      history.push("/");
    }
  });

  useEffect(() => {
    if (navbarPaths.includes(location)) {
      setRender("mini");
    } else {
      setRender("main");
    }
  }, [location]);

  if (render === "main" && authed) {
    return <MainNavbar />;
  } else {
    return <MiniNavbar />;
  }
};

export default Navbar;
