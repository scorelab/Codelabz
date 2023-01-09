import React from "react";
import ErrorPage from "../../components/ErrorPages/404";

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

const Template = args => <ErrorPage {...args} />;

export const Default = Template.bind({});

Default.args = {
  background: "white",
  textColor: "black"
};
