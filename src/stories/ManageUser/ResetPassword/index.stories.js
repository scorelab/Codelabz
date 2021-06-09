import React from "react";
import ResetPassword from "../../../components/ManageUsers/ResetPassword/index";
import ProviderWrapper from "../../../helpers/providerWrapper";
import { MemoryRouter } from "react-router-dom";
export default {
  title: "ManageUser/Reset Password Page",
  component: ResetPassword,
};

export const forgotpassword = () => (
  <ProviderWrapper>
    <MemoryRouter>
      <ResetPassword />{" "}
    </MemoryRouter>
  </ProviderWrapper>
);
