import React from "react";
import ProfileInfoCard from "../../../components/Profile/ProfileInfoCard/index";
import ProviderWrapper from "../../../helpers/providerWrapper";
import { MemoryRouter } from "react-router-dom";
export default {
  title: "Profile/Profile Info Card",
  component: ProfileInfoCard
};

export const profileinfocard = () => (
  <ProviderWrapper>
    <MemoryRouter>
      <ProfileInfoCard />
    </MemoryRouter>
  </ProviderWrapper>
);
