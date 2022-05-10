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
import HomeRounded from '@mui/icons-material/HomeRounded';
import { Link } from "react-router-dom";
import { AutoStoriesTwoTone} from "@mui/icons-material";
import GavelIcon from '@mui/icons-material/Gavel';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ContactsIcon from '@mui/icons-material/Contacts';


function HomePage({ background = "white", textColor = "black" }) {
  const classes = useStyles();
  const [value, setValue] = useState(2);
  const [posts, setPosts] = useState(userList);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClick = (e) => {
    let updatedPosts = userList.persons;
    updatedPosts = updatedPosts.filter(post => post.tags.includes(e.target.innerHTML));
    setPosts({persons:updatedPosts});
  }
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
            <Typography variant="h6" gutterBottom style={{fontWeight: 600 , marginBottom: "1rem", color: textColor }}>
              Main Menu
            </Typography>
          </Grid>
          <Grid container alignItems="left">
            <List component="nav" aria-label="mailbox folders" style={{ width: "100%" }}>
              <ListItem button>
              <Link to={""}><Typography  align="center"><HomeRounded />Home</Typography></Link>
              </ListItem>
              <Divider />
              <ListItem button divider>
                <Link><Typography  align="center"><AutoStoriesTwoTone/> Reading List</Typography></Link>
              </ListItem>
              <ListItem button>
                <Link><Typography  align="center"><LiveHelpIcon/> FAQ</Typography></Link>
              </ListItem>
              <Divider light />

              <ListItem button>
                <Link><Typography  align="center"><GavelIcon/> Terms of use</Typography></Link>
              </ListItem>
              <ListItem button>
                <Link><Typography  align="center"><ContactsIcon/> Contact Us</Typography></Link>
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
            <Typography variant="h6" gutterBottom style={{fontWeight: 600,marginBottom: "1rem", color: textColor }}>
              Popular Tags
              <br/>
            </Typography>
          </Grid>
          <Grid container alignItems="left">
            <List component="nav" aria-label="mailbox folders" style={{ width: "100%" }}>
              <ListItem button onClick={(e)=>handleClick(e)}>
                <ListItemText primary="#javascript" />
              </ListItem>
              <Divider />
              <ListItem button  divider  onClick={(e)=>handleClick(e)}>
                <ListItemText primary="#react" />
              </ListItem>
              <ListItem button onClick={(e)=>handleClick(e)}>
                <ListItemText style={{ fontWeight: 600 }} primary="#html" />
              </ListItem>
              <Divider light />
              <ListItem button onClick={(e)=>handleClick(e)}>
                <ListItemText primary="#css" />
              </ListItem>
              <Divider />
              <ListItem button onClick={(e)=>handleClick(e)}>
                <ListItemText primary="#webdev" />
              </ListItem>
              <Divider />
              <ListItem button onClick={(e)=>handleClick(e)}>
                <ListItemText primary="#beginners" />
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
          <Grid container alignItems="left">
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
                <ListItemText primary="Go/JS/PHP Software engineer looking for new opportunities" />
              </ListItem>
              <Divider />
              <ListItem button divider>
                <ListItemText primary="FREE COURSE, this weekend only: Ship better code faster" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Live-Coding on YouTube continues tomorrow" />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary="MEAN / MERN Stack 100+ Learning Resources {FREE}" />
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
          <Typography variant="h6" gutterBottom style={{fontWeight: 600,marginBottom: "1rem", color: textColor }}>
            Discussions & NewsFeed
          </Typography>
          <Grid container alignItems="left">
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
                <ListItemText primary="Game Dev Digest — Issue #83 - How and Why" />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary="What's new and special in Create Go App CLI v1.7.0?" />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary="Google’s Termination of Dr. Mitchell, Clubhouse Security, Low-Code Tools, & more on DevNews!" />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary="How to start a programming blog?" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}

export default HomePage;
