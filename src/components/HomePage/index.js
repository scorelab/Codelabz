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

function HomePage({ background = "white", textColor = "black" }) {
  const classes = useStyles();
  const [value, setValue] = useState(2);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card className={classes.wrapper} style={{ background: background }} data-testId="homepage">
      <div className={classes.sideBody}>
        <Grid
          container
          className={classes.sideCard}
          alignContent="center"
          direction="column"
          style={{
            width: "100%",
            overflow: "auto",
            maxHeight: "25rem",
          }}
          data-testId="homepageTagSidebar"
        >
          <Grid item>
            <br />
            <Typography variant="h6" gutterBottom style={{ marginBottom: "1rem", color: textColor }}>
              Popular Tags
            </Typography>
          </Grid>
          <Grid container alignItems="flex-start">
            <List component="nav" aria-label="mailbox folders" style={{ width: "100%" }}>
              <ListItem button>
                <ListItemText primary="#javascript" />
              </ListItem>
              <Divider />
              <ListItem button divider>
                <ListItemText primary="#react" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="#html" />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary="#css" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.sideCard}
          alignContent="center"
          direction="column"
          style={{
            width: "100%",
            overflow: "auto",
            maxHeight: "25rem",
          }}
          data-testId="homepagePopularEventSidebar"
        >
          <Grid item>
            <br />
            <Typography variant="h6" gutterBottom style={{ marginBottom: "1rem", color: textColor }}>
              Popular Events
            </Typography>
          </Grid>
          <Grid container alignItems="flex-start">
            <List component="nav" aria-label="mailbox folders" style={{ width: "100%" }}>
              <ListItem button>
                <ListItemText primary="Lorem Pervious Text" />
              </ListItem>
              <Divider />
              <ListItem button divider>
                <ListItemText primary="Lorem Pervious Text Event" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Lorem Pervious Text" />
              </ListItem>
              <Divider light />

              <ListItem button>
                <ListItemText primary="Lorem Pervious Text Previous Event" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
      <div className={classes.mainBody} data-testId="homepageMainBody">
        <Grid container className={classes.sort}>
          <Typography
            variant="h6"
            style={{
              padding: ".5rem 1rem",
              fontWeight: "bold",
              color: textColor,
            }}
          >
            Posts
          </Typography>
          <BottomNavigation
            showLabels
            style={{ background: "#f2f2f2" }}
            className={classes.sortedList}
            value={value}
            onChange={handleChange}
            data-testId="sortByTime"
          >
            <BottomNavigationAction label="Week" />
            <BottomNavigationAction label="Month" style={{ fontSize: "2rem" }} />
            <BottomNavigationAction label="Year" />
            <BottomNavigationAction label="Latest" />
          </BottomNavigation>
        </Grid>

        {userList.persons.map((person) => (
          <CardComponent title={person.title} tags={person.tags} profilePic={person.profilePic} org={person.org} />
        ))}
      </div>
      <div className={classes.sideBody}>
        <Grid
          container
          className={classes.sideCard}
          alignContent="center"
          direction="column"
          style={{ padding: "1rem" }}
          data-testId="homepageUpcomingEventSidebar"
        >
          <Grid item>
            <Typography variant="h6" gutterBottom style={{ marginBottom: "1rem", color: textColor }}>
              Upcoming Events
            </Typography>
          </Grid>
          <Grid container alignItems="flex-start">
            <List
              component="nav"
              aria-label="mailbox folders"
              style={{
                width: "100%",
                overflow: "auto",
                maxHeight: "25rem",
              }}
            >
              <ListItem button>
                <ListItemText primary="lorem lorem text lorem text text lorem text lorem text" />
              </ListItem>
              <Divider />
              <ListItem button divider>
                <ListItemText primary="lorem lorem text lorem text text lorem text lorem text" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="lorem lorem text lorem text text lorem text lorem text" />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary="lorem lorem text lorem text text lorem text lorem text" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.sideCard}
          alignContent="center"
          direction="column"
          style={{ padding: "1rem" }}
          data-testId="homepageDiscussionSidebar"
        >
          <Typography variant="h6" gutterBottom style={{ marginBottom: "1rem", color: textColor }}>
            Discussion
          </Typography>
          <Grid container alignItems="flex-start">
            <List
              component="nav"
              aria-label="mailbox folders"
              style={{
                width: "100%",
                overflow: "auto",
                maxHeight: "25rem",
                color: textColor,
              }}
            >
              <ListItem button>
                <ListItemText primary="lorem lorem text lorem text text lorem text lorem text" />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary="lorem lorem text lorem text text lorem text lorem text" />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary="lorem lorem text lorem text text lorem text lorem text" />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary="lorem lorem text lorem text text lorem text lorem text" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}

export default HomePage;
