import React from "react";

import ProfileCard3 from "../../../components/ProfileBanner/profile/ProfileCard3/index";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "ProfileBanner/ProfileCard3",
  component: ProfileCard3,
};

export const profile = () => (
  <ProviderWrapper>
    <ProfileCard3 />
  </ProviderWrapper>
);
