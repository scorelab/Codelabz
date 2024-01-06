import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ListIcon from "@mui/icons-material/List";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatIcon from "@mui/icons-material/Chat";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import UserList from "../../Editor/UserList";
import { publishUnpublishTutorial } from "../../../store/actions";
import { removetut } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import RemoveStepModal from "./RemoveStepModal";
import ColorPickerModal from "./ColorPickerModal";
import { Box, Stack } from "@mui/system";

const EditControls = ({
  isPublished,
  stepPanelVisible,
  isDesktop,
  setMode,
  noteID,
  mode,
  toggleImageDrawer,
  tutorial_id,
  toggleAddNewStep,
  visibility,
  owner,
  currentStep,
  step_length
}) => {
  const firebase = useFirebase();
  const history = useHistory();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [viewRemoveStepModal, setViewRemoveStepModal] = useState(false);
  const [viewColorPickerModal, setViewColorPickerModal] = useState(false);
  const [publishLoad, setPublishLoad] = useState(false);
  const DropdownMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleDeleteTutorial = async () => {
      await removetut(owner, tutorial_id)(firebase, firestore, dispatch);
      history.push("/");
    };
    console.log(tutorial_id);
    const tooltipStyles = `
    .tooltip-container {
      position: relative;
      display: inline-block;
  
    }
    .tooltip-container .tooltip-text {
      visibility: hidden;
      width: 180px;
      background-color: #555;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 50%;
      margin-left: -60px;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .tooltip-container:hover .tooltip-text {
      visibility: visible;
      opacity: 1;
    }
  `;
    return (
      <>
        <Button
          data-testid="dropdown-menu-button"
          style={{
            border: "none",
            padding: 0
          }}
          type="link"
          onClick={handleClick}
        >
          <ListIcon
            style={{
              fontSize: 20,
              verticalAlign: "top"
            }}
          />
        </Button>
        <Menu
          id="simple-menu"
          data-testid="editor-dropdown-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem key="edit_description">
            <FormatAlignLeftIcon /> Edit Description
          </MenuItem>
          <MenuItem
            key="edit_codeLabz_theme"
            onClick={() => setViewColorPickerModal(true)}
          >
            <FormatPaintIcon /> Edit CodeLabz Theme
          </MenuItem>

          <MenuItem
            key="delete_tutorial"
            onClick={!isPublished ? handleDeleteTutorial : ""}
            style={{
              color: isPublished ? "black" : "red",
              cursor: isPublished ? "not-allowed" : "pointer"
            }}
          >
            <DeleteIcon />
            {!isPublished ? (
              "Move to Trash"
            ) : (
              <div>
                <style>{tooltipStyles}</style>
                <div className="tooltip-container">
                  Move to Trash
                  <div className="tooltip-text">Unpublish to enable</div>
                </div>
              </div>
            )}
          </MenuItem>
        </Menu>
      </>
    );
  };
  const handlePublishTutorial = async () => {
    setPublishLoad(true);
    await publishUnpublishTutorial(owner, tutorial_id, isPublished)(
      firebase,
      firestore,
      dispatch
    );
    setPublishLoad(false);
  };

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          px: 2
        }}
      >
        <Button
          color="info"
          data-testid="addNewStep"
          variant="contained"
          sx={{
            boxShadow: "none",
            borderRadius: 1
          }}
          onClick={() => toggleAddNewStep()}
        >
          <AddIcon /> Add New Step
        </Button>
        <Button
          className="ml-24"
          color="warning"
          onClick={() => toggleImageDrawer()}
          id="tutorialAddImg"
          startIcon={<InsertDriveFileIcon />}
        >
          Add images
        </Button>

        <Button
          danger
          onClick={() => {
            setViewRemoveStepModal(!viewRemoveStepModal);
          }}
          disabled={step_length === 1}
        >
          <DeleteIcon /> Remove step
          <RemoveStepModal
            owner={owner}
            tutorial_id={tutorial_id}
            step_id={noteID}
            viewModal={viewRemoveStepModal}
            currentStep={currentStep}
            step_length={step_length}
          />
        </Button>
        <Box
          sx={{
            flexGrow: 1
          }}
        />
        <div>
          {!isDesktop && stepPanelVisible ? null : (
            <>
              {mode === "edit" && (
                <UserList tutorial_id={tutorial_id} noteID={noteID} />
              )}
              {mode === "view" && (
                <Button
                  type="primary"
                  className="ml-24"
                  onClick={() => setMode("edit")}
                  id="editorMode"
                  data-testId="editorMode"
                >
                  <EditIcon /> Editor mode
                </Button>
              )}
              {mode === "edit" && (
                <Button
                  type="primary"
                  className="ml-24"
                  onClick={() => setMode("view")}
                  data-testId="previewMode"
                >
                  <FileCopyIcon /> Preview mode
                </Button>
              )}
              <Button
                data-testid="publishTutorial"
                onClick={handlePublishTutorial}
                type="dashed"
                disabled={publishLoad}
              >
                <FileCopyIcon /> {isPublished ? "Unpublish" : "Publish"}
              </Button>
              <DropdownMenu key="more" />
            </>
          )}
        </div>
      </Stack>
      <ColorPickerModal
        visible={viewColorPickerModal}
        visibleCallback={e => setViewColorPickerModal(e)}
        tutorial_id={tutorial_id}
        owner={owner}
      />
    </>
  );
};

export default EditControls;
