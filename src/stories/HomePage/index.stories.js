/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import ProviderWrapper from "../../helpers/providerWrapper";
import Home from "../../components/Home/index";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Home",
  component: Home,
};

export const home = () => (
  <ProviderWrapper>
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  </ProviderWrapper>
);
