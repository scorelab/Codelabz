import React from "react";
import { MemoryRouter } from "react-router";
import OrgUsersCard from "../../../components/Organization/OrgUsersCard/orgUsersCard";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Organization/Organization User Card",
  component: OrgUsersCard,
};

const Template = (args) => (
  <ProviderWrapper>
    <MemoryRouter>
      <OrgUsersCard {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});
