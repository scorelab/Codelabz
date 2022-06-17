import React, { useState } from 'react';
import { MemoryRouter } from 'react-router';
import ActivityList from '../../../components/Topbar/Activity/ActivityList';
import ProviderWrapper from '../../../helpers/providerWrapper';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

const story = {
  title: 'Topbar/ActivityList',
  component: ActivityList,
};

export default story;

const Template = (args) => {
  const [List, setList] = useState(1);

  const acitvitylist = [
    {
      id: 1,
      icon: LocalOfferIcon,
      text: 'Featured',
    },
    {
      id: 2,
      icon: StarBorderIcon,
      text: 'New',
    },
    {
      id: 3,
      icon: EmojiEventsIcon,
      text: 'Top',
    },
  ];

  return (
    <ProviderWrapper>
      <MemoryRouter>
        <ActivityList
          {...args}
          value={List}
          toggle={(item) => {
            setList(item.id);
          }}
          acitvitylist={acitvitylist}
        />
      </MemoryRouter>
    </ProviderWrapper>
  );
};

export const Default = Template.bind({});
