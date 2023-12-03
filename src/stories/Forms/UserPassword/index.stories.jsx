import React from "react";
import UserPassword from "../../../components/Forms/UserPassword";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Forms/User",
  component: UserPassword
};

const Template = args => (
  <ProviderWrapper>
    <UserPassword />
  </ProviderWrapper>
);

export const password = Template.bind({});
