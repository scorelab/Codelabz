import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Chip from "@mui/material/Chip";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ToggleButton from "@mui/lab/ToggleButton";
import ToggleButtonGroup from "@mui/lab/ToggleButtonGroup";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
  }
}));

export default function CardWithoutPicture(props) {
  const classes = useStyles();
  const [alignment, setAlignment] = React.useState("left");
  const [count, setCount] = useState(1);
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Card className={classes.root}>
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
        <div className={classes.grow} />
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
    </Card>
  );
}
