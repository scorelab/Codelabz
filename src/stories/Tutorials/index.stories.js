import React from "react";
import { MemoryRouter } from "react-router-dom";
import ProviderWrapper from "../../helpers/providerWrapper";
import ViewTutorial from "../../components/Tutorials/index";

export default {
  title: "Tutorial",
  component: ViewTutorial,
};

export const tutorial = (args) => (
  <ProviderWrapper>
    <MemoryRouter>
      <ViewTutorial {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);
