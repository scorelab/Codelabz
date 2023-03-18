import React from "react";
import ForgotPassword from "../../../components/AuthPage/ForgotPassword";
import ProviderWrapper from "../../../helpers/providerWrapper";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "AuthPage/Froget Password Page",
  component: ForgotPassword,
  argTypes: {
    rootBackground: {
      control: "color"
    },
    buttonColor: {
      control: "color"
    }
  }
};

const Template = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <ForgotPassword {...args} />{" "}
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});

Default.args = {
  rootBackground: "rgba(0,0,0,.01)",
  confirmationText:
    "We have sent you an email containing the link to reset your password .Please check your inbox including spams",
  fontweight: "800",
  buttonColor: "blue"
};
