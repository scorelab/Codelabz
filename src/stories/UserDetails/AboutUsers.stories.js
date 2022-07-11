import AboutUsers from "../../components/UserDetails/AboutUsers";

export default {
    title: 'Components/UserDetails/AboutUsers',
    component: AboutUsers,
    argTypes: {
        backgroundColor: { control: 'color' },
        color: { control: 'color' },
        Heading: { control: 'text' },
        Content: { control: 'text' },
    },
};

export const Default = (args) => (<AboutUsers {...args} />)

Default.args = {
    Heading: '',
    Content: 'Lorem ipsum dolor sit amet,  elit consectetur adipiscing elit. In nec tristique pharetra mi eu pellente. Morbi nec metus vel sem tristique porttitor. porta mauris ac odio nec suscipit pretium. Suspendisse maximus nunc ipsum, at gravida nunc posuere in.  vel sem tristique porttitor. porta mauris ac odio nec suscipit pretium. Suspendisse maximus nunc ipsum, at gravida nunc posuere in.',

}
