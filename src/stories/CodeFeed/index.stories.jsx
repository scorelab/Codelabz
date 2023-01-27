import React from "react";
import { MemoryRouter } from "react-router";
import CodeFeed from "../../components/MyFeed/index";
import ProviderWrapper from "../../helpers/providerWrapper";

export default {
  title: "Organization/CodeFeed",
  component: CodeFeed,
  argTypes: {
    backgroundcolor: {
      control: "color",
    },
    textcolor: {
      control: "color",
    },
  },
};

const Template = (args) => (
  <ProviderWrapper>
    <MemoryRouter>
      <CodeFeed {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});

Default.args = {
  heading: "Explore Organization",
  title:
    "Explore top rated Organizations and find the Codelabz you are looking for",
};
