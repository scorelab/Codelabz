import React from "react";
import { MemoryRouter } from "react-router-dom";
import ProviderWrapper from "../../helpers/providerWrapper";
import ViewTutorial from "../../components/Tutorials";

export default {
  title: "Tutorial",
  component: ViewTutorial,
};

export const tutorial = () => (
  <ProviderWrapper>
    <MemoryRouter>Under Construction</MemoryRouter>
  </ProviderWrapper>
);
