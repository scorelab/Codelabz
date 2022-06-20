import React from "react";

import ProfileCard1 from "../../../components/ProfileBanner/profile/ProifleCard1/index";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "ProfileBanner/ProfileCard1",
  component: ProfileCard1,
};

export const profile = () => (
  <ProviderWrapper>
    <ProfileCard1 />
  </ProviderWrapper>
);
