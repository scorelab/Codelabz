/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import ProviderWrapper from "../../helpers/providerWrapper";
import Home from "../../components/HomePage/index";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Home/HomePage",
  component: Home,
  argTypes: {
    background: {
      control: "color",
    },
    textColor: {
      control: "color",
    },
  },
};

const Template = (args) => (
  <ProviderWrapper>
    <MemoryRouter>
      <Home {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});

Default.args = {
  background: "white",
  textColor: "black",
};
