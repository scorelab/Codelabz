import React from "react";
import ManageUser from "../../../components/ManageUsers/index";
import ProviderWrapper from "../../../helpers/providerWrapper";
import { MemoryRouter } from "react-router-dom";
export default {
  title: "ManageUser/Reset Password Page",
  component: ManageUser,
};

export const forgotpassword = () => (
  <ProviderWrapper>
    <MemoryRouter>
      <ManageUser />{" "}
    </MemoryRouter>
  </ProviderWrapper>
);
