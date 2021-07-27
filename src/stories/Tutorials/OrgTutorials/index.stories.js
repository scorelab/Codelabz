import React from "react";
import { MemoryRouter } from "react-router-dom";
import ProviderWrapper from "../../../helpers/providerWrapper";
import OrgTutorialsComponent from "../../../components/Tutorials/MyTutorials/OrgTutorials";

export default {
  title: "Tutorials/OrgTutorial",
  component: OrgTutorialsComponent,
};

const Template = (args) => (
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
      org_country: "Angola",
      org_description: undefined,
      org_handle: "test5test5",
      org_image: "",
      org_link_facebook: undefined,
      org_link_github: undefined,
      org_link_linkedin: undefined,
      org_link_twitter: undefined,
      org_name: "test5",
      org_published: true,
      org_website: "https://abc.com",
      tutorials_count: 7,
    },
  ],
  user: {
    displayName: "riju",
    photoURL:
      "https://firebasestorage.googleapis.com/v0/b/buoyant-country-311408.appspot.com/o/user%2Frijusougata31%2Fimages%2Fnewfile?alt=media&token=2c295b90-2183-4d2b-99b9-b83c8e2ef9ac",
    userHandle: "rijusougata31",
  },
};
