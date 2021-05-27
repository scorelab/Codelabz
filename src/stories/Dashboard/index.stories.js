import React from 'react';
import Dashboard from '../../components/Dashboard';
import ProviderWrapper from '../../helpers/providerWrapper';
export default {
  title: 'Dashboard',
  component: Dashboard,
};

export const dashboard = () => (
  <ProviderWrapper>
    <Dashboard />
  </ProviderWrapper>
);
