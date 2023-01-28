import { MemoryRouter } from "react-router-dom";
import CardWithPicture from "../../components/Card/CardWithPicture";
import ProviderWrapper from "../../helpers/providerWrapper";

export default {
  title: "Card/CardWithPicture",
  component: CardWithPicture,
  argTypes: {
    backgroundColor: { control: "color" },
    color: { control: "color" },
    name: { control: "text" },
    organizationName: { control: "text" },
    date: { control: "text" },
    title: { control: "text" },
    contentDescription: { control: "text" }
  }
};

export const Default = args => (
  <ProviderWrapper>
    <MemoryRouter>
      <CardWithPicture {...args} />
    </MemoryRouter>
  </ProviderWrapper>
);

Default.args = {
  Heading: "CardWithPicture",
  name: "Shahaab",
  organizationName: "Codelabz",
  date: "Dec 3, 2022",
  title: "FreeCodeCamp Especially If You Do Not Have 24/7 Internet Access",
  contentDescription:
    "Make sure your conditions fit with the map. Instead of writing logic handling for each case, We had a map, and we put the case and the logic as key, value pairs. Hence, We can retriev the logic from the map based on the key...",
  time: "10 min read"
};
