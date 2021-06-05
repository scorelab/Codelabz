import React from 'react';
import ForgotPassword from '../../../components/AuthPage/ForgotPassword';
import ProviderWrapper from '../../../helpers/providerWrapper';
import { MemoryRouter } from 'react-router-dom';
export default {
  title: 'AuthPage/Froget Password Page',
  component: ForgotPassword,
};

export const forgotpassword = () => (
  <ProviderWrapper>
    <MemoryRouter>
      <ForgotPassword />{' '}
    </MemoryRouter>
  </ProviderWrapper>
);
