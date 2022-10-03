import React from "react";
import UserForm from "../../../components/Forms/UserForm"
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Forms/UserForm",
  component: UserForm,
};

const Template = (args) => (
  <ProviderWrapper>
    <UserForm />
  </ProviderWrapper>
);

export const userform = Template.bind({});