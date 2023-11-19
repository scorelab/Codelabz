import Description from "../../components/UserDetails/Description";

export default {
  title: "Components/UserDetails/Description",
  component: Description,
  argTypes: {
    backgroundColor: { control: "color" },
    color: { control: "color" },
    Heading: { control: "text" },
    Content: { control: "text" }
  }
};

export const Default = args => <Description {...args} />;

Default.args = {
  Heading: "Description",
  Content:
    "Lorem ipsum dolor sit amet,  elit consectetur adipiscing elit. In nec tristique pharetra mi eu pellente. Morbi nec metus vel sem tristique porttitor. porta mauris ac odio nec suscipit pretium. Suspendisse maximus nunc ipsum, at gravida nunc posuere in.  vel sem tristique porttitor. porta mauris ac odio nec suscipit pretium. Suspendisse maximus nunc ipsum, at gravida nunc posuere in."
};

export const forYou = args => <Description {...args} />;

forYou.args = {
  Heading: "Codelabs you may like",
  Content:
    "Lorem ipsum dolor sit amet,  elit consectetur adipiscing elit. In nec tristique pharetra mi eu pellente. Morbi nec metus vel sem tristique porttitor. porta mauris ac odio nec suscipit pretium. Suspendisse maximus nunc ipsum, at gravida nunc posuere in.  vel sem tristique porttitor. porta mauris ac odio nec suscipit pretium. Suspendisse maximus nunc ipsum, at gravida nunc posuere in."
};
