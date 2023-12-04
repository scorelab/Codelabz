import React from "react";

import ProfileCardOne from "../../../components/ProfileBanner/profile/ProfileCardOne/index";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "ProfileBanner/ProfileCardOne",
  component: ProfileCardOne
};

const Template = args => (
  <ProviderWrapper>
    <ProfileCardOne {...args} />
  </ProviderWrapper>
);

export const ProfileCard = Template.bind({});

ProfileCard.args = {
  profileImage: "https://i.pravatar.cc/300",
  name: "Apple",
  story: "Think Different",
  followers: 402,
  following: 40
};
