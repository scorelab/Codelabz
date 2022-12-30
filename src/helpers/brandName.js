import React from "react";
import Logo from "../assets/images/logo.png";

function BrandName() {
  return (
    <>
      <img
        style={{
          width: "100px",
          cursor: "pointer"
        }}
        src={Logo}
        alt="logo"
      />
    </>
  );
}

export default BrandName;
