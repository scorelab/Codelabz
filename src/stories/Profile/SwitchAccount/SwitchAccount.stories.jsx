import SwitchAccount from "../../../components/Profile/SwitchAccount/SwitchAccount";

export default {
  title: 'Profile/Switch Account',
  component: SwitchAccount,
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    name: { control: 'text' },
    secondaryMail: { control: 'text' },
  },
};

export const Default = (args) => (<SwitchAccount {...args} />)

Default.args = {
  Heading: 'Switch Account',
  name: 'Shahaab Manzar',
  secondaryMail: 'shahaabmanzar@gmail.com',
  avatar: {
    type: "char",
    value: "S",
  },
}