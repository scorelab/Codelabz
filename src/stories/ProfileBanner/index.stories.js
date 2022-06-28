import React from "react";

import Banner from "../../components/ProfileBanner/Organization/index";
import ProviderWrapper from "../../helpers/providerWrapper";

export default {
  title: "ProfileBanner/Banner",
  component: Banner,
};

export const profile = () => (
  <ProviderWrapper>
    <Banner />
  </ProviderWrapper>
);
