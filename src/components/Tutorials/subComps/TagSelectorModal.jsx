import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  fetchTutorialTags,
  updateTutorialTags
} from "../../../store/actions/tutorialsActions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import Chip from "@mui/material/Chip"

const TagSelectorModal = ({ visible, visibleCallback, tutorial_id, owner }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState([]);

  const tagOptions = ["HTML", "Css", "JavaScript", "React", "Python", "Java"];

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await fetchTutorialTags(tutorial_id)(firebase, firestore, dispatch);
        setSelectedTags(tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    if (visible) {
      fetchTags();
    }
  }, [visible, tutorial_id, firebase, firestore, dispatch]);

  const handleTagSelection = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((selectedTag) => selectedTag !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const handleSaveTags = async () => {
    try {
      await updateTutorialTags(tutorial_id, selectedTags)(firebase, firestore, dispatch);
      visibleCallback(false);
    } catch (error) {
      console.error("Error updating tags:", error);
    }
  };

  return (
    <Modal
      open={visible}
      onClose={() => visibleCallback(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Select Tags
        </Typography>
        <Box sx={{ mt: 2 }}>
          {tagOptions.map(tag => (
            <Chip
            key={tag}
            label={tag}
            clickable
            onClick={() => handleTagSelection(tag)}
            color={selectedTags.includes(tag) ? "primary" : undefined}
            sx={{ mr: 1, mb: 1 }}
          />
          ))}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button onClick={handleSaveTags} variant="contained">
            Save Tags
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TagSelectorModal;
