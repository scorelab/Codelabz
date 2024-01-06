import React from "react";
import { MemoryRouter } from "react-router";
import EditOrganization from "../../../components/Organization/OrgInfoCard/editOrgDetailsModal";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Organization/Edit Organization",
  component: EditOrganization
};

const Template = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <EditOrganization {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});
Default.args = {
  currentOrgData: {
    org_country: "Test Country",
    org_description: "Test Description",
    org_handle: "Test",
    org_name: "Test",
    org_published: true,
    org_website: "https://org.org"
  }
};
