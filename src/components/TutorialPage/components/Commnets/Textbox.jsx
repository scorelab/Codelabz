import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment
} from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import { InsertEmoticon, Send } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
const Textbox = ({ type, handleSubmit }) => {
  const [commentText, setCommentText] = useState("");
  const [checkempty, setCheckEmpty] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const addEmoji = emoji => {
    setCommentText(prev => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };
  const submitHandler=(txt)=>{
    if(txt.length==0){
      setCheckEmpty(true);
      return ;
    }
    setCheckEmpty(false);
    handleSubmit(txt);
    setCommentText("");
};
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        width: "100%",
        gap: 1,
        margin: "10px 0 24px"
      }}
    >
      <AccountCircle
        sx={{
          color: "action.active",
          width: "36px",
          height: "36px"
        }}
      />
      <TextField
        label={type === "reply" ? "Reply" : "Write a comment"}
        variant="standard"
        error={checkempty}
        fullWidth
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ position: "relative" }}>
              <IconButton
                sx={{ mb: 1 }}
                onClick={() => setShowEmojiPicker(prev => !prev)}
              >
                <InsertEmoticon />
              </IconButton>
              <div
                style={{
                  position: "absolute",
                  zIndex: "100",
                  bottom: "24px"
                }}
              >
                {showEmojiPicker && (
                  <EmojiPicker
                    emojiStyle="google"
                    onEmojiClick={emoji => addEmoji(emoji)}
                  />
                )}
              </div>
            </InputAdornment>
          )
        }}
      />
      <Button
        variant="contained"
        disableElevation
        onClick={() => submitHandler(commentText)}
      >
        <Send />
      </Button>
    </Box>
  );
};

export default Textbox;
