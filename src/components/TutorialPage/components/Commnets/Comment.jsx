import {
  Card,
  Grid,
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Paper
} from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import { InsertEmoticon, Send } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { makeStyles } from "@mui/styles";
import CardActions from "@mui/material/CardActions";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ToggleButton from "@mui/lab/ToggleButton";
import ToggleButtonGroup from "@mui/lab/ToggleButtonGroup";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useState } from "react";
import Textbox from "./Textbox";
import { divide } from "lodash";
const useStyles = makeStyles(() => ({
  container: {
    margin: "10px 0",
    padding: "20px",
    overflow: "unset"
  },
  bold: {
    fontWeight: "600"
  },
  comments: {
    padding: "10px 15px"
  },
  settings: {
    flexWrap: "wrap",
    marginTop: "-10px",
    padding: "0 5px"
  },
  small: {
    padding: "2px"
  }
}));

const Comment = () => {
  const classes = useStyles();
  const [commentText, setCommentText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReplyfield, setShowReplyfield] = useState(false);
  const addEmoji = emoji => {
    setCommentText(prev => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };
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
    <>
      <Paper variant="outlined" className={classes.comments}>
        <Typography mb={1} sx={{ fontSize: "18px" }}>
          Amazing content keep it up 😃
        </Typography>
        <Grid container justifyContent="space-between">
          <Grid
            item
            container
            justifyContent="start"
            alignItems="start"
            columnSpacing={1}
            xs={6}
          >
            <Grid item>
              <Avatar sx={{ height: "30px", width: "30px" }}>A</Avatar>
            </Grid>
            <Grid item sx={{ width: "fit-content" }}>
              <Typography sx={{ fontSize: "12px" }}>
                <span className={classes.bold}>Abhishek</span>
              </Typography>
              <Typography
                sx={{ fontSize: "10px", opacity: "0.4", fontWeight: "600" }}
              >
                19th March,2023
              </Typography>
            </Grid>
          </Grid>
          <CardActions className={classes.settings} disableSpacing>
            {!showReplyfield && (
              <Button
                onClick={() => setShowReplyfield(true)}
                sx={{ textTransform: "none", fontSize: "12px" }}
              >
                Reply
              </Button>
            )}
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
            <IconButton aria-label="share" data-testId="MoreIcon">
              <MoreVertOutlinedIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Paper>
      {showReplyfield && (
        <div style={{ marginLeft: "10px" }}>
          <Textbox type="reply" />
        </div>
      )}
    </>
  );
};

export default Comment;
