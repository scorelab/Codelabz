import React from "react";

import ProfileCardTwo from "../../../components/ProfileBanner/profile/ProfileCardTwo/index";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "ProfileBanner/ProfileCardTwo",
  component: ProfileCardTwo,
};

const Template = (args) => (
  <ProviderWrapper>
    <ProfileCardTwo {...args} />
  </ProviderWrapper>
);

export const ProfileCard = Template.bind({});

ProfileCard.args = {
  profileImage: "https://i.pravatar.cc/300",
  name: "Salvick",
  followers: 402,
  contributors: 40,
};
