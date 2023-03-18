import React from "react";

import ProfileCardThree from "../../../components/ProfileBanner/profile/ProfileCardThree/index";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "ProfileBanner/ProfileCardThree",
  component: ProfileCardThree,
};

const Template = (args) => (
  <ProviderWrapper>
    <ProfileCardThree {...args} />
  </ProviderWrapper>
);

export const ProfileCard = Template.bind({});

ProfileCard.args = {
  profileImage: "https://i.pravatar.cc/300",
  name: "Salvick",
  story:
    "Lorem ipsum dolor sit amet, consectur aipcing elit. Intristique pharetra mi eu tesque. In tique pharetra mi eupellentesque adipiscing elit.elit. In tristique pharetra mi eutesque.",
  work: "IIT Roorkee, India",
  location: "India",
  joiningDate: "May 20, 2022",
};
