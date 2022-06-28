import React from "react";

import ProfileCardOne from "../../../components/ProfileBanner/profile/ProfileCardOne/index";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "ProfileBanner/ProfileCardOne",
  component: ProfileCardOne,
};

export const profile = () => (
  <ProviderWrapper>
    <ProfileCardOne />
  </ProviderWrapper>
);
