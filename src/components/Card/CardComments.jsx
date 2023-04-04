import React from "react";
import ReactQuill from "react-quill";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { blue } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video", "formula"],
    ["clean"]
  ]
};

export default function CardComments(props) {
  return (
    <div style={{ padding: "15px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="h6"
          pb={1}
          color="text.primary"
          data-testId="Title"
        >
          Comments ({props.comments.length})
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Sort by :</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={props.sortby}
            label="Sort by"
            onChange={props.handleSort}
          >
            <MenuItem value={1}>Mostly liked</MenuItem>
            <MenuItem value={2}>Sort by oldest</MenuItem>
            <MenuItem value={3}>Sort by latest</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ReactQuill
        modules={modules}
        theme="snow"
        value={props.value}
        onChange={props.setValue}
      />
      <div style={{ padding: "5px" }}>
        <Button
          size="small"
          variant="contained"
          onClick={props.handlePost}
          className={props.classes.margin}
        >
          Post
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={props.handleExpandClick}
        >
          Cancel
        </Button>
      </div>
      <div style={{ maxHeight: 500, padding: "30px", overflow: "auto" }}>
        {props.comments.map((comment, index) => (
          <>
            <Card key={index} sx={{ border: 1, margin: 0, padding: 0 }}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: blue[500], width: 34, height: 34 }}
                    aria-label="recipe"
                  >
                    {comment?.name?.slice(0, 1)}
                  </Avatar>
                }
                action={
                  <IconButton
                    onClick={() => props.handleDelete(comment.id)}
                    aria-label="settings"
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                title={comment.name}
                subheader={comment.date}
              />
              <CardContent className={props.classes.contentPadding}>
                <Typography variant="body2" color="text.secondary">
                  {comment.comment}
                </Typography>
              </CardContent>
            </Card>
            <CardActions disableSpacing>
              <IconButton
                onClick={() => props.handleIncrementLikes(comment.id)}
                aria-label="add to favorites"
              >
                <FavoriteIcon
                  sx={{ color: comment.isLiked ? "#DC143C" : "000" }}
                />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {comment.likes} likes
              </Typography>
              <IconButton aria-label="share">
                <QuestionAnswerIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {comment.replies} reply
              </Typography>
            </CardActions>
          </>
        ))}
      </div>
    </div>
  );
}
