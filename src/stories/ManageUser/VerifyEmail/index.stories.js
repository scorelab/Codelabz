import React from "react";
import VerifyEmail from "../../../components/ManageUsers/VerifyEmail/index";
import ProviderWrapper from "../../../helpers/providerWrapper";
import { MemoryRouter } from "react-router-dom";
export default {
  title: "ManageUser/Verify Email Page",
  component: VerifyEmail,
};

export const forgotpassword = () => (
  <ProviderWrapper>
    <MemoryRouter>
      <VerifyEmail />{" "}
    </MemoryRouter>
  </ProviderWrapper>
);
