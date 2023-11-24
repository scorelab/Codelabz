import React from "react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../../components/Footer/index";

export default {
  title: "Home/Footer",
  component: Footer
};

export const footer = () => (
  <MemoryRouter>
    <Footer />
  </MemoryRouter>
);
