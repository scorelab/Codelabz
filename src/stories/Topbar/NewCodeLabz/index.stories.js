import React, { useState } from 'react';
import { MemoryRouter } from 'react-router';
import NewCodelabz from '../../../components/Topbar/NewCodelabz';
import ProviderWrapper from '../../../helpers/providerWrapper';

const story = {
  title: 'Topbar/NewCodeLabz',
  component: NewCodelabz,
};

export default story;

const Template = (args) => {
  return (
    <ProviderWrapper>
      <MemoryRouter>
        <NewCodelabz {...args} />
      </MemoryRouter>
    </ProviderWrapper>
  );
};

export const Default = Template.bind({});
