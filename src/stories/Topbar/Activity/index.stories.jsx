import React from "react";
import { MemoryRouter } from "react-router";
import Activity from "../../../components/Topbar/Activity";
import ProviderWrapper from "../../../helpers/providerWrapper";

const story = {
  title: "Topbar/Activity",
  component: Activity
};

export default story;

const Template = args => {
  return (
    <ProviderWrapper>
      <MemoryRouter>
        <Activity {...args} />
      </MemoryRouter>
    </ProviderWrapper>
  );
};

export const Default = Template.bind({});
