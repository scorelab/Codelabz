import React from "react";
import Socials from "../../../components/Organization/OrganizationSocials"
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Organization/Organization Socials",
  component: Socials,
};

const Template = (args) => (
  <ProviderWrapper>
    <Socials />
  </ProviderWrapper>
);

export const socials = Template.bind({});