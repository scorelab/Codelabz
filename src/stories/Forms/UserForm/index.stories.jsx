import React from "react";
import UserForm from "../../../components/Forms/UserForm";
import ProviderWrapper from "../../../helpers/providerWrapper";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Forms/UserForm",
  component: UserForm
};

const Template = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <UserForm />
    </MemoryRouter>
  </ProviderWrapper>
);

export const userform = Template.bind({});
