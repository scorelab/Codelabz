import React from 'react';
import SignUp from '../../../components/AuthPage/SignUp';
import ProviderWrapper from '../../../helpers/providerWrapper';
import { MemoryRouter } from 'react-router-dom';
export default {
  title: 'AuthPage/Sign Up Page',
  component: SignUp,
};

export const signup = () => (
  <ProviderWrapper>
    <MemoryRouter>
      <SignUp />{' '}
    </MemoryRouter>
  </ProviderWrapper>
);
