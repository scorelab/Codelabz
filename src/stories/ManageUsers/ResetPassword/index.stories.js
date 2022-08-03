import React from "react";
import ProviderWrapper from "../../../helpers/providerWrapper";
import ResetPassword from "../../../components/ManageUsers/ResetPassword/index";
import { MemoryRouter } from "react-router";

const story = {
  title: "ManageUsers/ResetPassword",
  component: ResetPassword
};
export default story;

const Template = args => {
  return (
    <ProviderWrapper>
      <MemoryRouter>
        <ResetPassword {...args} />
      </MemoryRouter>
    </ProviderWrapper>
  );
};

export const Default = Template.bind({});
