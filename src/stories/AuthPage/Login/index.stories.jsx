import React from "react";
import Login from "../../../components/AuthPage/Login";
import ProviderWrapper from "../../../helpers/providerWrapper";
import { MemoryRouter } from "react-router-dom";
export default {
  title: "AuthPage/Login Page",
  component: Login,
  argTypes: {
    loginButton: {
      control: "color"
    },
    background: {
      control: "color"
    }
  }
};

const Template = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <Login {...args} />{" "}
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});

Default.args = {
  loginButton: "blue",
  background: "white",
  loginText: "Welcome Back!"
};
