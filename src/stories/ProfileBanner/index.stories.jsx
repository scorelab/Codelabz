import React from "react";

import Banner from "../../components/ProfileBanner/Organization/index";
import ProviderWrapper from "../../helpers/providerWrapper";

export default {
  title: "ProfileBanner/Banner",
  component: Banner
};

const Template = args => (
  <ProviderWrapper>
    <Banner {...args} />
  </ProviderWrapper>
);

export const ProfileBanner = Template.bind({});

ProfileBanner.args = {
  bannerImage: "https://postimg.cc/6ystr9mw",
  profileImage: "https://i.pravatar.cc/300",
  name: "Apple",
  story: "Think Different",
  followers: 402,
  contributors: 402,
  feed: 40
};
