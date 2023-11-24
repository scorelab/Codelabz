import React from "react";
import { MemoryRouter } from "react-router";
import MyTutorials from "../../../components/Tutorials/MyTutorials/index";
import BaseTutorial from "../../../components/Tutorials/MyTutorials/BaseTutorialsComponent/index";
import OrgTutorials from "../../../components/Tutorials/MyTutorials/OrgTutorials/index";
import UserTutorials from "../../../components/Tutorials/MyTutorials/UserTutorials/index";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Tutorials/MyTutorials",
  component: MyTutorials
};

const Template = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <MyTutorials {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});
