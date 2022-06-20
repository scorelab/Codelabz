import React from "react";

import ProfileCard2 from "../../../components/ProfileBanner/profile/ProfileCard2/index";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "ProfileBanner/ProfileCard2",
  component: ProfileCard2,
};

export const profile = () => (
  <ProviderWrapper>
    <ProfileCard2 />
  </ProviderWrapper>
);
