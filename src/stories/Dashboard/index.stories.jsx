import React from "react";
import Dashboard from "../../components/Dashboard";
import ProviderWrapper from "../../helpers/providerWrapper";
export default {
  title: "General/Dashboard",
  component: Dashboard,
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
    <Dashboard {...args} />
  </ProviderWrapper>
);

export const Default = Template.bind({});

Default.args = {
  background: "white",
  textColor: "black",
};
