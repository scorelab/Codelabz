import React from "react";

import ProfileCardThree from "../../../components/ProfileBanner/profile/ProfileCardThree/index";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "ProfileBanner/ProfileCardThree",
  component: ProfileCardThree,
};

export const profile = () => (
  <ProviderWrapper>
    <ProfileCardThree />
  </ProviderWrapper>
);
