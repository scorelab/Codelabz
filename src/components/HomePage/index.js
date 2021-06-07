import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
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

function HomePage() {
  const useStyles = makeStyles((theme) => ({
    wrapper: {
      display: "flex",
      alignItems: "top",
      justifyContent: "center",
      height: "100%",

      background: "#f2f2f2",
    },
    mainBody: {
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      //   flex: "1",
      height: "100%",
      margin: "1rem 0 2rem 0",
      flexDirection: "column",
    },
    sideBody: {
      display: "flex",
      alignContent: "flex-start",
      justifyContent: "flex-start",
      flex: "1",
      marginTop: "5rem",
      maxWidth: "20rem",
      margin: "0 1rem 2rem 1rem",
      height: "100%",
      flexDirection: "column",

      [theme.breakpoints.down(750)]: {
        display: "none",
      },
    },
    cardBody: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
      direction: "column",
    },
    pp: {
      display: "flex",
      justifyContent: "center",
      padding: "5rem",
      background: "red",
    },
    sort: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      margin: "0rem 0 0rem 0",
    },
    sortedList: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "row",
      width: "auto",
      [theme.breakpoints.down(750)]: {
        display: "none",
      },
    },
    navigation: {
      "&:selcted": {
        border: "2px solid black",
      },
    },
    sideCard: {
      minWidth: "20vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      maxHeight: "30rem",
      overflow: "auto",
      margin: "0 0 2rem 0",
      background: "white",
      boxShadow: ".5px 2px 5px gray",
    },
  }));
  const classes = useStyles();
  userList.persons.map((person) => {
    console.log(person);
  });
  return (
    <Card className={classes.wrapper}>
      <div className={classes.sideBody}>
        <Grid
          container
          className={classes.sideCard}
          alignContent="center"
          direction="column"
          style={{ padding: "1rem" }}
        >
          <Grid item>
            <Typography
              variant="h6"
              gutterBottom
              style={{ marginBottom: "1rem" }}
            >
              Popular Tags
            </Typography>
          </Grid>
          <Grid container alignItems="left">
            <List
              component="nav"
              className={classes.root}
              aria-label="mailbox folders"
              style={{ width: "100%" }}
            >
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
      </div>
      <div className={classes.mainBody}>
        <Grid container className={classes.sort}>
          <Typography variant="h6" style={{ padding: ".5rem 2rem" }}>
            Tutorial
          </Typography>
          <BottomNavigation
            showLabels
            style={{ background: "#f2f2f2" }}
            className={classes.sortedList}
          >
            <BottomNavigationAction
              label="week"
              className={classes.navigation}
            ></BottomNavigationAction>
            <BottomNavigationAction label="Month" />
            <BottomNavigationAction label="Year" />
            <BottomNavigationAction label="Latest" />
          </BottomNavigation>
        </Grid>
        {/* <CardComponent title="test" tags="codelabz" profilePic="logo.jpeg" />
        <CardComponent title="test" tags="codelabz" profilePic="logo.jpeg" />
        <CardComponent title="test" tags="codelabz" profilePic="logo.jpeg" />
        <CardComponent title="test" tags="codelabz" profilePic="logo.jpeg" />
        <CardComponent title="test" tags="codelabz" profilePic="logo.jpeg" />
        <CardComponent title="test" tags="codelabz" profilePic="logo.jpeg" />
        <CardComponent title="test" tags="codelabz" profilePic="logo.jpeg" />
        <CardComponent title="test" tags="codelabz" profilePic="logo.jpeg" /> */}
        {userList.persons.map((p) => {
          <CardComponent
            title={p.title}
            tags={p.tags}
            profilePic={p.profilePic}
          />;
        })}
      </div>
      <div className={classes.sideBody}>
        <Grid
          container
          className={classes.sideCard}
          alignContent="center"
          direction="column"
          style={{ padding: "1rem" }}
        >
          <Grid item>
            <Typography
              variant="h6"
              gutterBottom
              style={{ marginBottom: "1rem" }}
            >
              Upcoming Events
            </Typography>
          </Grid>
          <Grid container alignItems="left">
            <List
              component="nav"
              className={classes.root}
              aria-label="mailbox folders"
              style={{ width: "100%" }}
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
        >
          <Grid item>
            <Typography
              variant="h6"
              gutterBottom
              style={{ marginBottom: "1rem" }}
            >
              Discussion
            </Typography>
          </Grid>
          <Grid container alignItems="left">
            <List
              component="nav"
              className={classes.root}
              aria-label="mailbox folders"
              style={{ width: "100%" }}
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
      </div>
    </Card>
  );
}

export default HomePage;
