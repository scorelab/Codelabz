import React from "react";
import Connect from "../../../components/Profile/ConnectSocials";
import ProviderWrapper from "../../../helpers/providerWrapper";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Profile/Profile Socials",
  component: Connect
};

const Template = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <Connect />
    </MemoryRouter>
  </ProviderWrapper>
);

export const connectSocials = Template.bind({});
