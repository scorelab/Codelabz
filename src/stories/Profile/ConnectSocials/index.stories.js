import React from "react";
import Connect from "../../../components/Profile/ConnectSocials"
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Profile/Profile Socials",
  component: Connect,
};

const Template = (args) => (
  <ProviderWrapper>
    <Connect />
  </ProviderWrapper>
);

export const connectSocials = Template.bind({});