import React from "react";
import { MemoryRouter } from "react-router-dom";
import ProviderWrapper from "../../../helpers/providerWrapper";
import BaseTutorial from "../../../components/Tutorials/MyTutorials/BaseTutorialsComponent/index";

export default {
  title: "Tutorials/BaseTutorial",
  component: BaseTutorial,
};

const Template = (args) => (
  <ProviderWrapper>
    <MemoryRouter>
      <BaseTutorial {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});
Default.args = {
  owner: "rijusougata31",
  ownerName: "riju",
  users: [
    {
      featured_image: "",
      icon: "",
      owner: "rijusougata31",
      summary: "a",
      title: "CodeLabz - FrontEnd Improvements",
    },
  ],
};
