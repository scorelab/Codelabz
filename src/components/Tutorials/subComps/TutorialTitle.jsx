import React from "react";
// import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import Grid from "@mui/material/Grid";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { updateTutorialTitle } from "../../../store/actions";
import { useFirebase,useFirestore } from "react-redux-firebase";
// import Modal from 'react-modal';
import { useState } from "react";
import { Typography, Modal, Box, TextField, Button } from '@mui/material';
import { set } from "lodash";

const TutorialHeading = ({
  stepPanelVisible,
  isDesktop,
  setStepPanelVisible,
  tutorialData,
  timeRemaining,  
  
}) => {
  const dispatch = useDispatch(); 
  const firebase = useFirebase();
  const firestore = useFirestore();
  const [isHovered, setHovered] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  let [Fullscreen, setFullscreen] = useState(false);
  let [newTitle, setNewTitle] = useState("");
  const toggleFullscreen = () => {
    if (Fullscreen) {
      setFullscreen(false);
      document.exitFullscreen();
    } else {
      setFullscreen(true);
      document.documentElement.requestFullscreen();
    }
  };
  const handleEditClick = () => {
    setModalOpen(true);
  };

  // const handleUpdateClick = () => {
  //   // Handle title update logic
  //   console.log('Updating title:', newTitle);
  //   setModalOpen(false);
  // };

  const handleCancelClick = () => {
    // Handle cancel logic
    setNewTitle(tutorialData.title); // Reset the input value
    setModalOpen(false);
  };
  const handleUpdateTitle = async () => {
    try {
      await updateTutorialTitle(tutorialData.owner,tutorialData.tutorial_id, newTitle)(
        firebase,
        firestore,
        dispatch
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating title:", error);    }
  };
  let styleProps = {
    backgroundColor: tutorialData.background_color || "#ffffff",
    color: tutorialData.text_color || "#000000"
  };

  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
      }}
    >
       <Typography
      data-testid="tutorialTitle"
      variant="h5"
      sx={{
        pt: 2,
        pb: 2,
        position: 'relative',
        display: 'inline-block',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {tutorialData.title}
     <span style={{marginLeft:"10px"}}>
        <EditIcon
          style={{
            position: '',
            transform: 'translateY(+10%)',
            cursor: 'pointer',
          }}
          onClick={handleEditClick}
        />
    </span>
    </Typography>
   
    <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Edit Title
          </Typography>
          <TextField
            label="Enter new title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleCancelClick} variant="contained" color="error" sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleUpdateTitle} variant="contained" color="primary">
            Update
          </Button>
        </Box>
      </Modal>
      
      {!isDesktop && stepPanelVisible ? null : (
        <>
          <Grid>
            <Button type="text" className="p-0">
              <QueryBuilderIcon style={{ ...styleProps }} />{" "}
              <span style={{ ...styleProps }}>
                {timeRemaining} mins remaining
              </span>
            </Button>
            {Fullscreen ? (
              <Tooltip placement="left" title={"exit Fullscreen"}>
                <Button
                  type="dashed"
                  onClick={toggleFullscreen}
                  className="bp-8"
                  style={{ ...styleProps }}
                >
                  <FullscreenExitIcon />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip placement="left" title={"Go Fullscreen"}>
                <Button
                  type="dashed"
                  onClick={toggleFullscreen}
                  className="bp-8"
                  style={{ ...styleProps }}
                >
                  <FullscreenIcon />
                </Button>
              </Tooltip>
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default TutorialHeading;
