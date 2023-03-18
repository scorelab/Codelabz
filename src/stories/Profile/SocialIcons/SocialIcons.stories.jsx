import { MemoryRouter } from "react-router-dom";
import SocialIcons from "../../../components/Profile/SocialIcons/SocialIcons";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Profile/SocialIcons",
  component: SocialIcons,
  argTypes: {
    backgroundColor: { control: "color" },
    color: { control: "color" }
  }
};

export const Default = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <SocialIcons {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

Default.args = {
  Heading: "SocialIcons",
  Content: ""
};
