import React from 'react';
import Login from '../../../components/AuthPage/Login';
import ProviderWrapper from '../../../helpers/providerWrapper';
import { MemoryRouter } from 'react-router-dom';
export default {
  title: 'AuthPage/Login Page',
  component: Login,
};

export const login = () => (
  <ProviderWrapper>
    <MemoryRouter>
      <Login />{' '}
    </MemoryRouter>
  </ProviderWrapper>
);
