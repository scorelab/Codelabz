import React from "react";
import ProviderWrapper from "../../../helpers/providerWrapper";
import ResetPassword from "../../../components/ManageUsers/ResetPassword/index";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "ManageUsers/ResetPassword",
  component: ResetPassword,
};

const Template = () => (
  <ProviderWrapper>
    <MemoryRouter>
      <ResetPassword />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});
