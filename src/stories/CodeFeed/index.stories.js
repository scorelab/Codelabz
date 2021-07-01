import React from "react";
import { MemoryRouter } from "react-router";
import CodeFeed from "../../components/MyFeed/index";
import ProviderWrapper from "../../helpers/providerWrapper";

export default {
  title: "CodeFeed",
  component: CodeFeed,
};

const Template = (args) => (
  <ProviderWrapper>
    <MemoryRouter>
      <CodeFeed {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

export const Default = Template.bind({});

// export const dashboard = () => (
//   <ProviderWrapper>
//     <MemoryRouter>
//       <CodeFeed />
//     </MemoryRouter>
//   </ProviderWrapper>
// );
