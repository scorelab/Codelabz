import Highlights from "../../components/UserDetails/Highlights";

export default {
  title: "Components/UserDetails/Highlights",
  component: Highlights,
  argTypes: {
    backgroundColor: { control: "color" },
    color: { control: "color" },
    Heading: { control: "text" },
    CurrentJob: { control: "text" },
    Education: { control: "text" },
    Languages: { control: "text" },
    JoinedDate: { control: "text" }
  }
};

export const Default = args => <Highlights {...args} />;

Default.args = {
  Heading: "Credentials & Highlights",
  CurrentJob: "Software Engineer at Appbeans 2021-Present",
  Education: "Studying at Gl bajaj Institute of Technology, Delhi",
  Languages: "Tamil, English, Hindi, Malayalam",
  JoinedDate: "Joined December 2021"
};
