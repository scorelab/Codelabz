import React from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./VerifyEmail";

const ManageUsers = () => {
  const location = useLocation();
  const values = queryString.parse(location.search);

  return (
    <div className="row-fullheight">
      {values.mode === "resetPassword" ? (
        <ResetPassword queryParams={values} />
      ) : values.mode === "verifyEmail" ? (
        <VerifyEmail queryParams={values} />
      ) : null}
    </div>
  );
};

export default ManageUsers;
