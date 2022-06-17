import React from 'react';
import { MemoryRouter } from 'react-router';
import Navbar from '../../../components/NavBar';
import ProviderWrapper from '../../../helpers/providerWrapper';

const story = {
  title: 'Topbar/Navbar',
  component: Navbar,
};

export default story;

const Template = (args) => (
  <ProviderWrapper>
    <MemoryRouter>
      <Navbar {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});
