import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardComponent from "../util/CodelabCard/index";
import Typography from "@material-ui/core/Typography";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { userList } from "./userList";
import useStyles from "./styles";
import SideBar from "../SideBar/index";
import TagCard from "../CardTabs/Tags/index";
import EventsCard from "../CardTabs/Events/index";
import OrgUser from "../../assets/images/org-user.svg";
import UserCard from "../CardTabs/Users/index";
import NewCodelabz from "../Topbar/NewCodelabz";
import CardWithPicture from "../Card/CardWithPicture";
import CardWithoutPicture from "../Card/CardWithoutPicture";
import Activity from "../Topbar/Activity";
import useWindowSize from "../../helpers/customHooks/useWindowSize";
import NewTutorial from "../Tutorials/NewTutorial";

function HomePage({ background = "white", textColor = "black" }) {
  const classes = useStyles();
  const [value, setValue] = useState(2);
  const [visibleModal, setVisibleModal] = useState(false);
  const [footerContent, setFooterContent] = useState([
    { name: "Help", link: "https://dev.codelabz.io/" },
    { name: "About", link: "https://dev.codelabz.io/" },
    { name: "Content Policy", link: "https://dev.codelabz.io/" },
    { name: "Terms", link: "https://dev.codelabz.io/" },
    { name: "Privacy Policy", link: "https://dev.codelabz.io/" },
    {
      name: `CodeLabz @${new Date().getFullYear()}`,
      link: "https://dev.codelabz.io/"
    }
  ]);

  const windowSize = useWindowSize();
  const [openMenu, setOpen] = useState(false);
  const toggleSlider = () => {
    setOpen(!openMenu);
  };
  const [upcomingEvents, setUpEvents] = useState([
    {
      name: "Google Summer of Code",
      img: [OrgUser],
      date: "25 March, 2022"
    },
    {
      name: "Google Summer of Code",
      img: [OrgUser],
      date: "25 March, 2022"
    },
    {
      name: "Google Summer of Code",
      img: [OrgUser],
      date: "25 March, 2022"
    },
    {
      name: "Google Summer of Code",
      img: [OrgUser],
      date: "25 March, 2022"
    }
  ]);
  const [tags, setTags] = useState([
    "HTML",
    "JavaScript",
    "Css",
    "Python",
    "React",
    "Java",
    "HTML",
    "JavaScript",
    "Css",
    "Python",
    "React",
    "HTML",
    "JavaScript",
    "Css",
    "Python",
    "React",
    "Java",
    "HTML",
    "JavaScript",
    "Css",
    "Python",
    "React"
  ]);

  const [usersToFollow, setUsersToFollow] = useState([
    {
      name: "Janvi Thakkar",
      img: [OrgUser],
      desg: "Software Engineer",
      onClick: {}
    },
    {
      name: "Janvi Thakkar",
      img: [OrgUser],
      desg: "Software Engineer",
      onClick: {}
    },
    {
      name: "Janvi Thakkar",
      img: [OrgUser],
      desg: "Software Engineer",
      onClick: {}
    },
    {
      name: "Janvi Thakkar",
      img: [OrgUser],
      desg: "Software Engineer",
      onClick: {}
    }
  ]);

  const [contributors, setContributors] = useState([
    {
      name: "Janvi Thakkar",
      img: [OrgUser],
      desg: "Software Engineer",
      onClick: {}
    },
    {
      name: "Janvi Thakkar",
      img: [OrgUser],
      desg: "Software Engineer",
      onClick: {}
    },
    {
      name: "Janvi Thakkar",
      img: [OrgUser],
      desg: "Software Engineer",
      onClick: {}
    },
    {
      name: "Janvi Thakkar",
      img: [OrgUser],
      desg: "Software Engineer",
      onClick: {}
    }
  ]);

  const notification = () => {};
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const closeModal = () => {
    setVisibleModal((prev) => !prev);
  };
  return (
    <Card
      className={classes.wrapper}
      style={{ background: background }}
      data-testId="homepage"
      onClick={() => {
        toggleSlider();
      }}
    >
      <Grid className={classes.contentPart}>
        <div className={classes.sideBody}>
          {windowSize.width > 750 && (
            <Grid
              item
              container
              className={classes.leftSideCard}
              direction="column"
              style={{
                width: "100%",
                overflow: "auto",
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none"
              }}
            >
              <Grid item className={classes.outerSideBar}>
                <SideBar open={openMenu} toggleSlider={toggleSlider} />
              </Grid>
            </Grid>
          )}
        </div>
        <Grid
          item
          className={classes.mainBody}
          data-testId="homepageMainBody"
          xs={10}
        >
          <NewCodelabz setVisibleModal = {setVisibleModal} />
          <NewTutorial viewModal={visibleModal} onSidebarClick={(e) => closeModal(e)} />
          <Activity />
          {userList.persons.map(person => {
            return person.Heading == "CardWithoutPicture" ? (
              <CardWithoutPicture {...person} />
            ) : (
              <CardWithPicture {...person} />
            );
          })}
        </Grid>

        <Grid item className={classes.sideBody}>
          <Grid
            item
            container
            alignContent="center"
            direction="column"
            style={{
              width: "100%"
            }}
            data-testId="homepageTagSidebar"
          >
            <Grid item style={{ minWidth: "100%" }}>
              <TagCard tags={tags} />
            </Grid>
          </Grid>
          <Grid
            container
            alignContent="center"
            direction="column"
            style={{
              width: "100%"
            }}
            data-testId="homepageUpcomingEvents"
          >
            <Grid item style={{ minWidth: "100%" }}>
              <EventsCard title={"Upcoming Events"} events={upcomingEvents} />
            </Grid>
          </Grid>
          <Grid
            container
            alignContent="center"
            direction="column"
            style={{
              width: "100%"
            }}
            data-testId="homepageUsersToFollow"
          >
            <Grid item style={{ minWidth: "100%" }}>
              <UserCard title={"Who to Follow"} users={usersToFollow} />
            </Grid>
          </Grid>
          <Grid
            container
            alignContent="center"
            direction="column"
            style={{
              width: "100%",
              overflow: "auto",
              maxHeight: "25rem",
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none"
            }}
            data-testId="homepageContributors"
          >
            <Grid item style={{ minWidth: "100%" }}>
              <UserCard title={"Contributors"} users={contributors} />
            </Grid>
          </Grid>

          <Grid
            container
            alignContent="center"
            direction="column"
            style={{
              width: "100%"
            }}
            data-testId="homepagePopularEventSidebar"
          >
            <Grid item style={{ minWidth: "100%" }}>
              <EventsCard title={"Popular Events"} events={upcomingEvents} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default HomePage;
