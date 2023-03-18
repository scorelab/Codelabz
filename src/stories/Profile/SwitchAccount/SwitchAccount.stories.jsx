import { MemoryRouter } from "react-router-dom";
import SwitchAccount from "../../../components/Profile/SwitchAccount/SwitchAccount";
import ProviderWrapper from "../../../helpers/providerWrapper";

export default {
  title: "Profile/Switch Account",
  component: SwitchAccount,
  argTypes: {
    backgroundColor: { control: "color" },
    color: { control: "color" },
    name: { control: "text" },
    secondaryMail: { control: "text" }
  }
};

export const Default = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <SwitchAccount {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

Default.args = {
  Heading: "Switch Account",
  name: "Shahaab Manzar",
  secondaryMail: "shahaabmanzar@gmail.com",
  avatar: {
    type: "char",
    value: "S"
  }
};
