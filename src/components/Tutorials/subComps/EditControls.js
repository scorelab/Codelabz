import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ListIcon from "@material-ui/icons/List";
import DeleteIcon from "@material-ui/icons/Delete";
import ChatIcon from "@material-ui/icons/Chat";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatPaintIcon from "@material-ui/icons/FormatPaint";
import UserList from "../../Editor/UserList";
import { hideUnHideStep } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import RemoveStepModal from "./RemoveStepModal";
import ColorPickerModal from "./ColorPickerModal";

const EditControls = ({
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
  step_length,
}) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [viewRemoveStepModal, setViewRemoveStepModal] = useState(false);
  const [viewColorPickerModal, setViewColorPickerModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  const DropdownMenu = () => {
    return (
      <>
        <Button
          style={{
            border: "none",
            padding: 0,
          }}
          type="link"
          onClick={handleClick}
        >
          <ListIcon
            style={{
              fontSize: 20,
              verticalAlign: "top",
            }}
          />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          style={{ left: "80vw", top: "20%  " }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
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
            onClick={() => null}
            style={{ color: "red" }}
          >
            <DeleteIcon /> Move to Trash
          </MenuItem>
        </Menu>
      </>
    );
  };

  return (
    <>
      <Grid
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: ".5rem",
        }}
        className={
          (!stepPanelVisible && !isDesktop
            ? "ant-page-header-fix "
            : "ant-page-header-unfix ") + "tutorial-title-header low-padding"
        }
      >
        <div>
          <Button
            type="primary"
            variant="outlined"
            onClick={() => toggleAddNewStep()}
          >
            <AddIcon /> Add New Step
          </Button>
          <Button
            variant="outlined"
            className="ml-24"
            onClick={() => toggleImageDrawer()}
          >
            <InsertDriveFileIcon /> Add images
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={true}
                autoHideDuration={6000}
                message="updating step visibility...."
              />;
              hideUnHideStep(
                owner,
                tutorial_id,
                noteID,
                visibility
              )(firebase, firestore, dispatch).then(() => {
                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  open={true}
                  autoHideDuration={6000}
                  message="updated...."
                />;
              });
            }}
          >
            {!visibility ? (
              <>
                <VisibilityOffIcon /> Show step
              </>
            ) : (
              <>
                <VisibilityIcon /> Hide step
              </>
            )}
          </Button>
          <Button
            variant="outlined"
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
        </div>
        <div>
          {!isDesktop && stepPanelVisible ? null : (
            <>
              {mode === "edit" && (
                <UserList tutorial_id={tutorial_id} noteID={noteID} />
              )}
              <Button
                type="text"
                shape="circle"
                icon={<ChatIcon />}
                size="large"
                className="ml-24"
              />
              {mode === "view" && (
                <Button
                  type="primary"
                  className="ml-24"
                  onClick={() => setMode("edit")}
                >
                  <EditIcon /> Editor mode
                </Button>
              )}
              {mode === "edit" && (
                <Button
                  type="primary"
                  className="ml-24"
                  onClick={() => setMode("view")}
                >
                  <FileCopyIcon /> Preview mode
                </Button>
              )}
              <Button type="dashed">
                <FileCopyIcon /> Publish
              </Button>
              <DropdownMenu key="more" />
            </>
          )}
        </div>
      </Grid>
      <ColorPickerModal
        visible={viewColorPickerModal}
        visibleCallback={(e) => setViewColorPickerModal(e)}
        tutorial_id={tutorial_id}
        owner={owner}
      />
    </>
  );
};

export default EditControls;
