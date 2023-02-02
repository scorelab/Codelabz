import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Chip from "@material-ui/core/Chip";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import TurnedInNotOutlinedIcon from "@material-ui/icons/TurnedInNotOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider
} from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0.5rem",
    borderRadius: "10px",
    boxSizing: "border-box",
    [theme.breakpoints.down("md")]: {
      width: "auto"
    },
    [theme.breakpoints.down("xs")]: {
      width: "auto"
    }
  },
  grow: {
    flexGrow: 1
  },
  margin: {
    marginRight: "5px"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  inline: {
    fontWeight: 600
  },
  contentPadding: {
    padding: "0 16px"
  },
  icon: {
    padding: "5px"
  },
  time: {
    lineHeight: "1"
  },
  small: {
    padding: "4px"
  },
  settings: {
    flexWrap: "wrap"
  },
  comment:{
    width: "100%",
    padding: "2rem 1rem",
    display: "flex",
    alignItems: "center",

  },
  commentInput:{
    marginLeft:"auto",
    width: "50%",
  },
  commentDiv:{
    display: "flex",
    width: "50%",
    marginLeft:"auto",
    alignItems: "center",
    justifyContent: "end",
    padding: "0 2rem",
  },
  commentBtn:{
    padding: "0.5rem 1rem",
    color: "white",
    backgroundColor: "#44ABFA",
    borderRadius: "0.8rem",
    "&:hover": {
      backgroundColor: "#52A7E8",
      // filter: "brightness(1.4)",
    },
  },
}));

export default function CardWithoutPicture(props) {
  const classes = useStyles();
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const [alignment, setAlignment] = React.useState("left");
  const [count, setCount] = useState(1);
  const [comment, setComment] = useState(false)
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleComment = () => {
    setComment(!comment)
  }
  return (
    <Card className={classes.root}>
      <ThemeProvider theme={theme}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              data-testId="UserAvatar"
            >
              S
            </Avatar>
          }
          title={
            <React.Fragment>
              <Typography
                component="span"
                variant="h7"
                className={classes.inline}
                color="textPrimary"
                data-testId="UserName"
              >
                {props.name}
              </Typography>
              {props.organizationName && (
                <>
                  {" for "}
                  <Typography
                    component="span"
                    variant="h7"
                    className={classes.inline}
                    color="textPrimary"
                    data-testId="UserOrgName"
                  >
                    {props.organizationName}
                  </Typography>
                </>
              )}
            </React.Fragment>
          }
          subheader={props.date}
        />
        <CardContent className={classes.contentPadding}>
          <Typography variant="h5" color="text.primary" data-testId="Title">
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            paragraph
            data-testId="Description"
          >
            {props.contentDescription}
          </Typography>
        </CardContent>
        <CardActions className={classes.settings} disableSpacing>
          <CardActions disableSpacing>
          <Chip
            label="HTML"
            component="a"
            href="#chip"
            clickable
            variant="outlined"
            className={classes.margin}
          />
          <Typography
            variant="overline"
            display="block"
            className={classes.time}
            data-testId="Time"
          >
            {props.time}
          </Typography>
          </CardActions>
          <div className={classes.grow} />
          <CardActions disableSpacing>
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
          <IconButton aria-label="share" data-testId="CommentIcon" onClick={handleComment}>
            <ChatOutlinedIcon />
          </IconButton>
          <IconButton aria-label="add to favorites" data-testId="ShareIcon">
            <ShareOutlinedIcon />
          </IconButton>
          <IconButton aria-label="share" data-testId="NotifIcon">
            <TurnedInNotOutlinedIcon />
          </IconButton>
          <IconButton aria-label="share" data-testId="MoreIcon">
            <MoreVertOutlinedIcon />
          </IconButton>
          </CardActions>
        </CardActions>
      </ThemeProvider>
      <div
      className={classes.comment}
      style={{display: comment ? "flex" : "none"}}
      >
        <FormControl defaultValue="" required className={classes.commentInput}>
          {/* <FormLabel>Comment</FormLabel> */}
          <Input   placeholder="Comment on tutorial" />
        </FormControl>
        <div className={classes.commentDiv}>
        <Button className={classes.commentBtn}>Comment</Button>
        </div>
      </div>
    </Card>
  );
}