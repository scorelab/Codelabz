import React, { useEffect, useState } from "react";
import ProfileCardOne from "../../ProfileBanner/profile/ProfileCardOne";
import Activity from "../../Topbar/Activity";
import CardWithPicture from "../../Card/CardWithPicture";
import CardWithoutPicture from "../../Card/CardWithoutPicture";
import Highlights from "../../UserDetails/Highlights";
import SocialIcons from "../../Profile/SocialIcons/SocialIcons";
import EventsCard from "../../CardTabs/Events/index";
import { Grid, makeStyles } from "@material-ui/core";
import OrgUser from "../../../assets/images/org-user.svg";
import { userList } from "../../HomePage/userList";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles(theme => ({
  parentBody: {
    background: "#f9f9f9",
    display: "flex",
    justifyContent: "space-evenly",
    paddingTop: theme.spacing(5)
  },
  leftBody: {
    width: "60%",
    [theme.breakpoints.down(750)]: {
      width: "98%"
    }
  },
  rightBody: {
    [theme.breakpoints.down(750)]: {
      display: "none"
    }
  },
  bottomMargin: {
    marginBottom: "10px"
  },
  marginActivity: {
    marginTop: "10px",
    marginBottom: "10px"
  },
  paddingActivity: {
    padding: "10px"
  }
}));

function UserProfile(props) {
  const classes = useStyles();

  const [organizations, setUpOrganizations] = useState([
    {
      name: "Google Summer of Code",
      img: [OrgUser],
    },
    {
      name: "Google Summer of Code",
      img: [OrgUser],
    },
    {
      name: "Google Summer of Code",
      img: [OrgUser],
    },
    {
      name: "Google Summer of Code",
      img: [OrgUser],
    }
  ]);


  return (
    <>
      <div className={classes.parentBody}>
        <div className={classes.leftBody}>
          <Grid>
            <Card>
              <ProfileCardOne
                profileImage={
                  props.profileData.photoURL
                    ? props.profileData.photoURL
                    : "https://i.pravatar.cc/300"
                }
                name={props.profileData.displayName}
                story={
                  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
                }
                followers={402}
                following={40}
              />
            </Card>
          </Grid>
          <Grid className={classes.marginActivity}>
            <Card className={classes.paddingActivity}>
              <Activity />
            </Card>
          </Grid>
          <Grid>
            {userList.persons.map(person => {
              return person.Heading == "CardWithoutPicture" ? (
                <CardWithoutPicture {...person} className={classes.card} />
              ) : (
                <CardWithPicture {...person} className={classes.card} />
              );
            })}
          </Grid>
        </div>
        <div className={classes.rightBody}>
          <Grid className={classes.bottomMargin}>
            <Highlights
              Heading={"Credentials & Highlights"}
              CurrentJob={"Software Engineer at Appbeans 2021-Present"}
              Education={"Studying at Gl bajaj Institute of Technology, Delhi"}
              Languages={"Tamil, English, Hindi, Malayalam"}
              JoinedDate={"Joined December 2021"}
            />
          </Grid>
          <Grid className={classes.bottomMargin}>
            <SocialIcons />
          </Grid>
          <Grid
            container
            alignContent="center"
            direction="column"
            style={{
              width: "100%"
            }}
          >
            <Grid item style={{ minWidth: "100%" }}>
              <EventsCard title={"Organizations"} events={organizations} />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
