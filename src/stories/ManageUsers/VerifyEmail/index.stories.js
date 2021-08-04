import React from "react";
import ProviderWrapper from "../../../helpers/providerWrapper";
import VerifyEmail from "../../../components/ManageUsers/VerifyEmail/index";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "ManageUsers/VerifyEmail",
  component: VerifyEmail,
};

const Template = () => (
  <ProviderWrapper>
    <MemoryRouter>
      <VerifyEmail />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});
