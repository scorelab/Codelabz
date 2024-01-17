import React, { useEffect, useState } from "react";
import ProfileCardOne from "../../ProfileBanner/profile/ProfileCardOne";
import Activity from "../../Topbar/Activity";
import CardWithPicture from "../../Card/CardWithPicture";
import CardWithoutPicture from "../../Card/CardWithoutPicture";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import OrgUser from "../../../assets/images/org-user.svg";
import { userList } from "../../HomePage/userList";
import Card from "@mui/material/Card";
import UserHighlights from "./UserHighlights";

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
  //styles for userCredential Card on small screen
  rightSmallBody: {
    [theme.breakpoints.up(750)]: {
      display: "none"
    },
    marginTop: "11px",
    marginBottom: "-30px"
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
      img: [OrgUser]
    },
    {
      name: "Google Summer of Code",
      img: [OrgUser]
    },
    {
      name: "Google Summer of Code",
      img: [OrgUser]
    },
    {
      name: "Google Summer of Code",
      img: [OrgUser]
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

          {/* Display this card on screen size below 760px */}
          <Grid className={classes.rightSmallBody}>
            <UserHighlights organizations={organizations} />
          </Grid>

          <Grid className={classes.marginActivity}>
            <Card className={classes.paddingActivity}>
              <Activity />
            </Card>
          </Grid>

          <Grid>
            {userList.persons.map(person => {
              return person.Heading == "CardWithoutPicture"&& 1==2 ? (
                <CardWithoutPicture {...person} className={classes.card} />
              ) : (
                <CardWithPicture {...person} className={classes.card} />
              );
            })}
          </Grid>
        </div>

        {/* Credentials and Highlights Card.Display it on screen size above 760px */}
        <Grid className={classes.rightBody}>
          <UserHighlights organizations={organizations} />
        </Grid>
      </div>
    </>
  );
}

export default UserProfile;
