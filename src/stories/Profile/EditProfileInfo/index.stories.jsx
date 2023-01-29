import React from "react";
import EditProfileView from "../../../components/Profile/ProfileInfoCard/editProfileDetailsModal";
import ProviderWrapper from "../../../helpers/providerWrapper";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Profile/Edit Profile",
  component: EditProfileView
};

const Template = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <EditProfileView {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});
Default.args = {
  profileData: {
    country: "Test",
    description: "Test Description",
    displayName: "Test Name",
    email: "Test@gmail.com",
    following: ["Test username"],
    handle: "Test handle",
    isEmpty: false,
    isLoaded: true,
    link_facebook: "Test facebook",
    link_github: "Test github",
    link_linkedin: "Test linkedin",
    link_twitter: "Test twitter",
    orgFollowed: ["Test Org"],
    organizations: (1)["Test Org"],
    website: ""
  }
};
