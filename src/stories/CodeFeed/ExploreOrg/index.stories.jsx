import React from "react";
import { MemoryRouter } from "react-router";
import ExploreOrg from "../../../components/MyFeed/ExploreOrgs";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Organization/ExploreOrg",
  component: ExploreOrg,
  argTypes: {
    cardColor: {
      control: "color"
    }
  }
};

const Template = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <ExploreOrg {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});

Default.args = {
  cardHeight: 450,
  cardWidth: 345,
  mediaHeight: 320,
  mediaWidth: 320,
  cardColor: "white"
};
