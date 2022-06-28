import React from "react";
import Organizations from "../../../components/Forms/Organizations"
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Forms/Organizations",
  component: Organizations,
};

const Template = (args) => (
  <ProviderWrapper>
    <Organizations />
  </ProviderWrapper>
);

export const organization = Template.bind({});