import React, { useEffect, useState } from "react";
import { Typography, Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { getUserProfileData } from "../../../store/actions";
import { isUserFollower } from "../../../store/actions/profileActions";
import { addUserFollower } from "../../../store/actions";
const useStyles = makeStyles(() => ({
  container: {
    padding: "20px",
    boxSizing: "border-box"
  },
  small: {
    padding: "2px"
  },
  bold: {
    fontWeight: "600"
  }
}));
const User = ({ id, timestamp, showFollowButton, size }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const [user, setUser] = useState(null);
  const [isFollowed, setIsFollowed] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserProfileData(id)(firebase, firestore, dispatch);
      setUser(data);
    };
    fetchData();
  }, [id, firebase, firestore, dispatch]);

  const profileData = useSelector(({ firebase: { profile } }) => profile);

  // const user = useSelector(
  //   ({
  //     profile: {
  //       user: { data }
  //     }
  //   }) => data
  // );

  useEffect(() => {
    const checkIsFollowed = async () => {
      const status = await isUserFollower(
        profileData?.uid,
        user?.uid,
        firestore
      );
      setIsFollowed(status);
    };
    if (id && user && profileData) {
      checkIsFollowed();
    }
    return () => {};
  }, [profileData, user]);

  const followUser = () => {
    addUserFollower(profileData, user, firestore);
  };

  const getTime = timestamp => {
    return timestamp.toDate().toDateString();
  };
  return (
    <>
      <Grid
        item
        container
        justifyContent="start"
        alignItems="start"
        columnSpacing={1}
        xs={6}
      >
        <Grid sx={{ height: "100%", width: "auto" }} item>
          <Avatar
            sx={{
              height: size == "sm" ? "24px" : "40px",
              width: size == "sm" ? "24px" : "40px"
            }}
          >
            {user?.photoURL && user?.photoURL.length > 0 ? (
              <img src={user?.photoURL} />
            ) : (
              user?.displayName[0]
            )}
          </Avatar>
        </Grid>
        <Grid item sx={{ width: "fit-content" }}>
          <Typography
            sx={{
              fontSize: size == "sm" ? "14px" : "16px"
            }}
          >
            <span className={classes.bold} data-testId="tutorialpageAuthorName">
              {user?.displayName}
            </span>
          </Typography>
          <Typography
            sx={{
              fontSize: size == "sm" ? "10px" : "12px",
              opacity: "0.5",
              fontWeight: "600"
            }}
          >
            {timestamp ? getTime(timestamp) : ""}
          </Typography>
          {showFollowButton && (
            <Button
              variant="contained"
              onClick={followUser}
              disabled={isFollowed}
              sx={{
                borderRadius: "50px",
                height: "20px",
                textTransform: "none",
                padding: "1px 10px"
              }}
            >
              Follow +
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default User;
