import React from "react";
import { MemoryRouter } from "react-router-dom";
import ProviderWrapper from "../../../helpers/providerWrapper";
import NewTutorials from "../../../components/Tutorials/NewTutorial/index";

export default {
  title: "Tutorials/NewTutorials",
  component: NewTutorials,
};

const Template = (args) => (
  <ProviderWrapper>
    <MemoryRouter>
      <NewTutorials {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});
Default.args = {
  viewModal: true,
};
