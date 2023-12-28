import React from "react";
import { MemoryRouter } from "react-router";
import AddOrganization from "../../../components/Organization/OrgUsersCard/addOrgUserModal";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Organization/Add Organization",
  component: AddOrganization
};

const Template = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <AddOrganization {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});
