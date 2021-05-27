import React from 'react';
import ProfileInfoCard from '../../../components/Profile/ProfileInfoCard/index';
import ProviderWrapper from '../../../helpers/providerWrapper';
export default {
  title: 'Profile/Profile Info Card',
  component: ProfileInfoCard,
};

export const profileinfocard = () => (
  <ProviderWrapper>
    <ProfileInfoCard />
  </ProviderWrapper>
);
