import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import navbarPaths from "./navbarPaths";
import MiniNavbar from "./MiniNavbar";
import MainNavbar from "./MainNavbar";
import { useAuthStatus } from "../../helpers/customHooks";

const Navbar = () => {
  let { pathname: location } = useLocation();
  const [render, setRender] = useState("main");
  const authed = useAuthStatus();

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
    return <MiniNavbar type={location} />;
  }
};

export default Navbar;
