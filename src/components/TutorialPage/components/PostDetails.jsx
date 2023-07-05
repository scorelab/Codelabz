import React, { useEffect, useState } from "react";
import { Card, Typography, Grid, Box, Chip, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ToggleButton from "@mui/lab/ToggleButton";
import ToggleButtonGroup from "@mui/lab/ToggleButtonGroup";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { getUserProfileData } from "../../../store/actions";
const useStyles = makeStyles(() => ({
  container: {
    padding: "20px",
    boxSizing: "border-box"
  },
  settings: {
    flexWrap: "wrap",
    marginTop: "-10px",
    padding: "0 5px"
  },
  small: {
    padding: "2px"
  },
  chip: {
    marginLeft: "5px",
    fontWeight: "300",
    height: "20px"
  },
  bold: {
    fontWeight: "600"
  }
}));

const PostDetails = ({ details }) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const [alignment, setAlignment] = React.useState("left");
  const [count, setCount] = useState(details.upVote - details.downVote);

  useEffect(() => {
    getUserProfileData(details.user)(firebase, firestore, dispatch);
  }, [details]);

  const user = useSelector(
    ({
      profile: {
        user: { data }
      }
    }) => data
  );

  const getTime = timestamp => {
    console.log(timestamp);
    return timestamp.toDate().toDateString();
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const classes = useStyles();
  return (
    <>
      {details && (
        <Card className={classes.container}>
          <Grid>
            <Box>
              <Grid container columnSpacing={2} alignItems="center">
                <Grid item>
                  <Typography sx={{ fontWeight: "700", fontSize: "1.2rem" }}>
                    {details?.title}
                    {details?.tag?.map(tag => (
                      <Chip
                        label={tag}
                        variant="outlined"
                        className={classes.chip}
                      />
                    ))}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ width: "100%", marginTop: "10px" }}>
              {/* <Grid container> */}
              <Grid container justifyContent="space-between" alignItems="end">
                <Grid
                  item
                  container
                  justifyContent="start"
                  alignItems="start"
                  columnSpacing={1}
                  xs={6}
                >
                  <Grid sx={{ height: "100%", width: "auto" }} item>
                    <Avatar>
                      {user?.photoURL && user?.photoURL.length > 0 ? (
                        <img src={user?.photoURL} />
                      ) : (
                        user?.displayName
                      )}
                    </Avatar>
                  </Grid>
                  <Grid item sx={{ width: "fit-content" }}>
                    <Typography>
                      <span className={classes.bold}>{user?.displayName}</span>
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        opacity: "0.4",
                        fontWeight: "600"
                      }}
                    >
                      {details?.published_on
                        ? getTime(details?.published_on)
                        : ""}
                    </Typography>
                    <Button
                      variant="contained"
                      disabled
                      sx={{
                        borderRadius: "50px",
                        height: "20px",
                        textTransform: "none",
                        padding: "1px 10px"
                      }}
                    >
                      Follow +
                    </Button>
                  </Grid>
                </Grid>

                <Grid item sx={{ width: "fit-content" }}>
                  <CardActions className={classes.settings} disableSpacing>
                    <ToggleButtonGroup
                      size="small"
                      className={classes.small}
                      value={alignment}
                      exclusive
                      onChange={handleAlignment}
                      aria-label="text alignment"
                    >
                      <ToggleButton
                        className={classes.small}
                        onClick={handleIncrement}
                        value="left"
                        aria-label="left aligned"
                      >
                        <KeyboardArrowUpIcon />
                        <span>{count}</span>
                      </ToggleButton>
                      <ToggleButton
                        className={classes.small}
                        onClick={handleDecrement}
                        value="center"
                        aria-label="centered"
                      >
                        <KeyboardArrowDownIcon />
                      </ToggleButton>
                    </ToggleButtonGroup>
                    <IconButton aria-label="share" data-testId="CommentIcon">
                      <ChatOutlinedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="add to favorites"
                      data-testId="ShareIcon"
                    >
                      <ShareOutlinedIcon />
                    </IconButton>
                    <IconButton aria-label="share" data-testId="NotifIcon">
                      <TurnedInNotOutlinedIcon />
                    </IconButton>
                    <IconButton aria-label="share" data-testId="MoreIcon">
                      <MoreVertOutlinedIcon />
                    </IconButton>
                  </CardActions>
                </Grid>
              </Grid>
              {/* </Grid> */}
            </Box>
          </Grid>
        </Card>
      )}
    </>
  );
};

export default PostDetails;
