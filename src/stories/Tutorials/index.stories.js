import React from "react";
import { MemoryRouter } from "react-router-dom";
import ProviderWrapper from "../../helpers/providerWrapper";
import ViewTutorial from "../../components/Tutorials/index";
export default {
  title: "Tutorials/Tutorial",
  component: ViewTutorial,
};

const Template = (args) => (
  <ProviderWrapper>
    <MemoryRouter>
      <ViewTutorial {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});
