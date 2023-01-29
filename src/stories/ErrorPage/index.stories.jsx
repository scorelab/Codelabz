import React from "react";
import ErrorPage from "../../components/ErrorPages/404";
import ProviderWrapper from "../../helpers/providerWrapper";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "General/ErrorPage",
  component: ErrorPage,
  argTypes: {
    background: {
      control: "color"
    },
    textColor: {
      control: "color"
    }
  }
};

const Template = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <ErrorPage {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});

Default.args = {
  background: "white",
  textColor: "black"
};
