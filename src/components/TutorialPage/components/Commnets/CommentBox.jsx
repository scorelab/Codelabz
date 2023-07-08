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
import Comment from "./Comment";
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

const CommentBox = () => {
  const classes = useStyles();
  return (
    <Card className={classes.container}>
      <Typography variant="h5" sx={{ fontWeight: "600" }}>
        Comments(34)
      </Typography>
      <Textbox />
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Comment />
        </Grid>

        <Grid item xs={12}>
          <Comment />
        </Grid>

        <Grid item xs={12}>
          <Comment />
        </Grid>
        <Grid item container justifyContent="center">
          <Button sx={{ textTransform: "none", fontSize: "14px" }}>
            + Load More
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CommentBox;
