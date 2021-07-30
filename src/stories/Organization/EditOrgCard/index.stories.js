import React from "react";
import { MemoryRouter } from "react-router";
import EditOrganization from "../../../components/Organization/OrgInfoCard/editOrgDetailsModal";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Organization/Edit Organization",
  component: EditOrganization,
};

const Template = (args) => (
  <ProviderWrapper>
    <MemoryRouter>
      <EditOrganization {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});
Default.args = {
  currentOrgData: {
    org_country: "Australia",
    org_description:
      "Here you can find there is no image, it is also a test org for testing how it looks without image",
    org_handle: "testtest",
    org_image:
      "https://firebasestorage.googleapis.com/v0/b/buoyant-country-311408.appspot.com/o/organizations%2Ftesttest%2Fimages%2Fnewfile?alt=media&token=ca486b11-7154-48f3-a401-cdc8dfe9c73d",
    org_link_facebook: undefined,
    org_link_github: undefined,
    org_link_linkedin: undefined,
    org_link_twitter: undefined,
    org_name: "super test",
    org_published: true,
    org_website: "https://org.org",
  },
};
