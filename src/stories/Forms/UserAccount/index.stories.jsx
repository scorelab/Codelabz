import React from "react";
import UserAccount from "../../../components/Forms/UserAccount";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Forms/User",
  component: UserAccount,
};

const Template = (args) => (
  <ProviderWrapper>
    <UserAccount />
  </ProviderWrapper>
);

export const account = Template.bind({});