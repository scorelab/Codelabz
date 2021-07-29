import React from "react";
import EditProfileCard from "../../../components/Profile/ProfileInfoCard/editProfileDetailsModal";
import ProviderWrapper from "../../../helpers/providerWrapper";
export default {
  title: "Profile/Edit Info Card",
  component: EditProfileCard,
};

const Template = (args) => (
  <ProviderWrapper>
    <EditProfileCard {...args} />
  </ProviderWrapper>
);

export const Default = Template.bind({});
Default.args = {
  profileData: {
    country: "Argentina",
    description: "",
    displayName: "riju",
    email: "sougatariju13@gmail.com",
    following: ["rijusougata13"],
    handle: "rijusougata31",
    isEmpty: false,
    isLoaded: true,
    link_facebook: "",
    link_github: "rijusougata13",
    link_linkedin: "",
    link_twitter: "",
    orgFollowed: ["rijusougata13"],
    organizations: (5)[
      ("testtest", "test5test5", "hellohello", "dasdasda", "das")
    ],
    photoURL:
      "https://firebasestorage.googleapis.com/v0/b/buoyant-country-311408.appspot.com/o/user%2Frijusougata31%2Fimages%2Fnewfile?alt=media&token=2c295b90-2183-4d2b-99b9-b83c8e2ef9ac",
    uid: "3Y7p7UVittajrIWWID7xF5MWDpt1",
    website: "",
  },
};
