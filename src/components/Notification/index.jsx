import { Grid, Card } from "@mui/material";
import SideBar from "../SideBar";
import EventsCard from "../CardTabs/Events";
import UserCard from "../CardTabs/Users";
import IconButton from "@mui/material/IconButton";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import useStyles from "./styles";
import { useState } from "react";
import useWindowSize from "../../helpers/customHooks/useWindowSize";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import OrgUser from "../../assets/images/org-user.svg";
import Box from "@mui/material/Box";
import CardWithoutPicture from "../Card/CardWithoutPicture";
import { MoreVertOutlined } from "@mui/icons-material";
import NotificationBox from "./NotificationBox";
import { notifications } from "./notifications";
const Notification = ({ background = "white", textColor = "black" }) => {
  const classes = useStyles();
  const [openMenu, setOpen] = useState(false);
  const toggleSlider = () => {
    setOpen(!openMenu);
  };
  const windowSize = useWindowSize();
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

  return (
    <>
      <section
        className={classes.wrapper}
        style={{ background: background }}
        data-testId="homepage"
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
            data-testId="noitificationMainBody"
            xs={10}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "1.5rem",
                marginBottom: "24px"
              }}
            >
              Notifications
            </Typography>
            <div className={classes.container}>
              {notifications.map((notification,key) => {
                return <NotificationBox key={key} notification={notification} />;
              })}
            </div>
          </Grid>
          <Grid item className={classes.sideBody}>
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
      </section>
    </>
  );
};

export default Notification;
