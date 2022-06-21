import React from "react";

import ProfileCardTwo from "../../../components/ProfileBanner/profile/ProfileCardTwo/index";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "ProfileBanner/ProfileCardTwo",
  component: ProfileCardTwo,
};

export const profile = () => (
  <ProviderWrapper>
    <ProfileCardTwo />
  </ProviderWrapper>
);
