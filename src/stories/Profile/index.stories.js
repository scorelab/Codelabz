import React from 'react';

import Profile from '../../components/Profile/index';
import ProviderWrapper from '../../helpers/providerWrapper';

export default {
  title: 'Profile/Profile',
  component: Profile,
};

export const profile = () => (
  <ProviderWrapper>
    <Profile />
  </ProviderWrapper>
);
