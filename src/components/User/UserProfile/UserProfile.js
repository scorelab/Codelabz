import React, { useEffect, useState } from "react";
import ProfileCardOne from "../../ProfileBanner/profile/ProfileCardOne";
import Activity from "../../Topbar/Activity";
import CardWithPicture from "../../Card/CardWithPicture";
import CardWithoutPicture from "../../Card/CardWithoutPicture";
import Highlights from "../../UserDetails/Highlights";
import SocialIcons from "../../Profile/SocialIcons/SocialIcons";
import UserCard from "../../CardTabs/Users";
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
    width: "60%"
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

function UserProfile() {
  const classes = useStyles();

  const [contributors, setContributors] = useState([
    {
      name: "Janvi Thakkar",
      img: [OrgUser],
      desg: "Software Engineer",
      onClick: {},
      onClick: {}
    },
    {
      name: "Janvi Thakkar",
      img: [OrgUser],
      desg: "Software Engineer",
      onClick: {},
      onClick: {}
    },
    {
      name: "Janvi Thakkar",
      img: [OrgUser],
      desg: "Software Engineer",
      onClick: {},
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
      <div className={classes.parentBody}>
        <div className={classes.leftBody}>
          <Grid>
            <Card>
              <ProfileCardOne
                profileImage={"https://i.pravatar.cc/300"}
                name={"Shahaab Manzar"}
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
          <Grid>
            <UserCard title={"Contributors"} users={contributors} />
          </Grid>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
