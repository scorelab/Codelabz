import React from "react";
import Organizations from "../../../components/Profile/Organizations";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Profile/Organizations",
  component: Organizations,
};

const Template = (args) => (
  <ProviderWrapper>
    <Organizations />
  </ProviderWrapper>
);

export const organization = Template.bind({});