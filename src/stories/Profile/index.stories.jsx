import React from "react";

import Profile from "../../components/Profile/index";
import ProviderWrapper from "../../helpers/providerWrapper";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Profile/Profile",
  component: Profile
};

export const profile = () => (
  <ProviderWrapper>
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  </ProviderWrapper>
);
