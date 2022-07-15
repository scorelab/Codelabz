import SocialIcons from "../../../components/Profile/SocialIcons/SocialIcons";

export default {
  title: 'Profile/SocialIcons',
  component: SocialIcons,
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
  },
};

export const Default = (args) => (<SocialIcons {...args} />)

Default.args = {
  Heading: 'SocialIcons',
  Content: '',

}