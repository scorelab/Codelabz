import React, {useState} from "react";
import { Box, Card, Typography, Button,Modal, Backdrop, Fade, CircularProgress } from "@mui/material";
import useStyles from "./styles";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useHistory } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UserAccount = () => {
  const classes = useStyles();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [isAccountDeactivated, setIsAccountDeactivated] = useState(false)
  const history = useHistory();

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleDeleteAccount = () => {
    setDeleting(true);
    setError(null);

    const user = firebase.auth().currentUser;

    user.delete().then(() => {
      console.log('User Account deleted successfully');
      history.push("/login");
    }).catch(error => {
      console.log('Error deleting user account: ',error);
      setError(error.message);
    }).finally(() => {
      setDeleting(false);
    });
  }

  return (
    <Card className={classes.card} data-testId="userSettingsPage">
      <Box style={{ xs: { maxWidth: "100%" }, md: { maxWidth: "60%" } }}>
        <Box className={classes.row}>
          <Typography
            className={classes.text}
            style={{ width: "56%" }}
            data-testId="exportData"
          >
            Export account data
          </Typography>
          <Typography
            className={classes.text}
            style={{ color: "#0075AD" }}
            data-testId="startExport"
          >
            Start export
          </Typography>
        </Box>
        <Box className={classes.row}>
          <Typography
            className={classes.text}
            style={{ width: "56%" }}
            data-testId="successorSettings"
          >
            Successor settings
          </Typography>
          <Typography
            className={classes.text}
            style={{ color: "#0075AD" }}
            data-testId="addSuccessor"
          >
            Add successor
          </Typography>
        </Box>

        <div>
        <Button
          className={classes.text}
          style={{ color: "#FF5959", marginBottom: 0 }}
          data-testId="deactivateAccount"
        >
          Deactivate Account 
        </Button>
        </div>

        <div>
        <Button
          className={classes.text}
          style={{ color: "#FF5959" }}
          data-testId="deleteAccount"
          onClick={handleOpenModal}
        >
          {deleting ? <CircularProgress size={24} /> : "Delete account"}
        </Button>
        {error && <Typography style={{color: "#FF5959"}}>{error}</Typography>}
        </div>

        {/* Modal for confirmation */}
        <Modal
          aria-labelledby="delete-account-modal-title"
          aria-describedby="delete-account-modal-description"
          open={open}
          onClose={handleCloseModal}
          closeAfterTransition
          
        >
          <Fade in={open}>
            <Box className={classes.modal} sx={style}>
              <Typography id="delete-account-modal-title" variant="h6" gutterBottom>
                Are you sure you want to delete your account?
              </Typography>
              <Box style={{marginTop: "20px"}}>
                <Button onClick={handleCloseModal} color="primary" variant="outlined" style={{marginLeft: "50px"}}>
                  Cancel
                </Button>
                <Button onClick={handleDeleteAccount} color="error" variant="contained" style={{marginLeft: "100px"}}>
                  Delete
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Card>
  );
};

export default UserAccount;
