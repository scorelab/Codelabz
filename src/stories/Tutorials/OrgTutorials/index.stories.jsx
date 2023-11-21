import React from "react";
import { MemoryRouter } from "react-router-dom";
import ProviderWrapper from "../../../helpers/providerWrapper";
import OrgTutorialsComponent from "../../../components/Tutorials/MyTutorials/OrgTutorials";

export default {
  title: "Tutorials/OrgTutorial",
  component: OrgTutorialsComponent
};

const Template = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <OrgTutorialsComponent {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});
Default.args = {
  organizations: [
    {
      org_country: "Org Country",
      org_description: undefined,
      org_handle: "Org handle",
      org_image: "",
      org_link_facebook: "Org facebook",
      org_link_github: "Org github",
      org_link_linkedin: "Org linkedin",
      org_link_twitter: "Org twitter",
      org_name: "Org name",
      org_published: true,
      org_website: "https://org.com",
      tutorials_count: 7
    }
  ],
  user: {
    displayName: "OrgDisplayName",
    userHandle: "OrgDisplayName"
  }
};
