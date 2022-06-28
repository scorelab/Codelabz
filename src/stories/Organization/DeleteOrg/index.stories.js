import React from "react";
import { MemoryRouter } from "react-router";
import OrgDelete from "../../../components/Organization/OrgUsers/OrgDelete";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Organization/Delete Organisation",
  component: OrgDelete,
};

const Template = (args) => (
  <ProviderWrapper>
    <MemoryRouter>
      <OrgDelete {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);


export const Default = Template.bind({});

Default.args = {
  
}