/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../../components/NavBar";
import ProviderWrapper from "../../helpers/providerWrapper";

export default {
  title: "Navbar",
  component: Navbar,
};

export const navbar = () => (
  <ProviderWrapper>
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  </ProviderWrapper>
);
