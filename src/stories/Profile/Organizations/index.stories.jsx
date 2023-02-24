import React from "react";
import Organizations from "../../../components/Profile/Organizations";
import ProviderWrapper from "../../../helpers/providerWrapper";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Profile/Organizations",
  component: Organizations
};

const Template = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <Organizations />
    </MemoryRouter>
  </ProviderWrapper>
);

export const organization = Template.bind({});
