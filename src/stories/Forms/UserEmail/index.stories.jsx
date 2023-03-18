import React from "react";
import UserEmail from "../../../components/Forms/UserEmail";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Forms/User",
  component: UserEmail,
};

const Template = (args) => (
  <ProviderWrapper>
    <UserEmail />
  </ProviderWrapper>
);

export const email = Template.bind({});