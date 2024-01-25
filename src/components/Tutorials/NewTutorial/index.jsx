import React, { useEffect, useState } from "react";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createTutorial } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { Alert, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import { deepPurple } from "@mui/material/colors";
import { Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import MovieIcon from "@mui/icons-material/Movie";
import Select from "react-select";
import { common } from "@mui/material/colors";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    paddingTop: "8px",
    paddingBottom: "10px"
  },
  item: {
    margin: "10px"
  },
  purple: {
    color: deepPurple[700],
    backgroundColor: deepPurple[500]
  }
}));

const NewTutorial = ({ viewModal, onSidebarClick, viewCallback, active }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formValue, setformValue] = useState({
    title: "",
    summary: "",
    owner: ""
  });

  const loadingProp = useSelector(
    ({
      tutorials: {
        create: { loading }
      }
    }) => loading
  );
  const errorProp = useSelector(
    ({
      tutorials: {
        create: { error }
      }
    }) => error
  );

  useEffect(() => {
    setLoading(loadingProp);
  }, [loadingProp]);

  useEffect(() => {
    setError(errorProp);
  }, [errorProp]);

  const organizations = useSelector(
    ({
      profile: {
        data: { organizations }
      }
    }) => organizations
  );

  const userHandle = useSelector(
    ({
      firebase: {
        profile: { handle }
      }
    }) => handle
  );

  const displayName = useSelector(
    ({
      firebase: {
        profile: { displayName }
      }
    }) => displayName
  );

  const profileData = useSelector(({ firebase: { profile } }) => profile);
  
  //This name should be replaced by displayName when implementing backend
  const sampleName = "User Name Here";
  const allowOrgs = organizations && organizations.length > 0;

  const orgList =
    allowOrgs > 0
      ? organizations
          .map((org, i) => {
            if (org.permissions.includes(3) || org.permissions.includes(2)) {
              return org;
            } else {
              return null;
            }
          })
          .filter(Boolean)
      : null;

  useEffect(() => {
    setVisible(viewModal);
  }, [viewModal]);

  const onSubmit = formData => {
    formData.preventDefault();
    const tutorialData = {
      ...formValue,
      created_by: userHandle,
      is_org: userHandle !== formValue.owner,
      completed: false,
      uid:profileData.uid
    };
    console.log(tutorialData);
    createTutorial(tutorialData)(firebase, firestore, dispatch, history);
  };

  const onOwnerChange = value => {
    setformValue(prev => ({
      ...prev,
      owner: value
    }));
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setformValue(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const classes = useStyles();
  return (
    <Modal
      open={visible}
      onClose={onSidebarClick}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        data-testId="tutorialNewModal"
        style={{
          height: "auto",
          width: "auto",
          background: "white",
          padding: "2rem",
          paddingTop: "1rem",
          maxWidth: "80%"
        }}
      >
        {error && (
          <Alert message={""} type="error" closable="true" className="mb-24">
            description={"Tutorial Creation Failed"}/
          </Alert>
        )}
        <Typography variant="h5">Create a Tutorial</Typography>
        <Box
          sx={{
            py: 2,
            width: "50%"
          }}
        >
          <Typography>
            <Select
              options={organizations?.map(org => ({
                value: org.org_handle,
                label: org.org_name
              }))}
              onChange={data => {
                onOwnerChange(data.value);
              }}
              id="orgSelect"
            />
          </Typography>
        </Box>

        <form id="tutorialNewForm">
          <TextField
            prefix={
              <AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Title of the Tutorial"
            autoComplete="title"
            name="title"
            variant="outlined"
            fullWidth
            data-testId="newTutorial_title"
            id="newTutorialTitle"
            style={{ marginBottom: "2rem" }}
            onChange={e => handleChange(e)}
          />

          <TextField
            prefix={
              <AppstoreAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            }
            fullWidth
            variant="outlined"
            name="summary"
            placeholder="Summary of the Tutorial"
            autoComplete="summary"
            id="newTutorialSummary"
            data-testId="newTutorial_summary"
            onChange={e => handleChange(e)}
            style={{ marginBottom: "2rem" }}
          />

          <IconButton>
            <ImageIcon />
          </IconButton>
          <IconButton>
            <MovieIcon />
          </IconButton>
          <IconButton>
            <DescriptionIcon />
          </IconButton>

          <div className="mb-0">
            <div style={{ float: "right" }}>
              <Button
                key="back"
                onClick={onSidebarClick}
                id="cancelAddTutorial"
              >
                Cancel
              </Button>
              <Button
                key="submit"
                type="primary"
                variant="contained"
                color="secondary"
                htmlType="submit"
                loading={loading}
                onClick={e => onSubmit(e)}
                data-testid="newTutorialSubmit"
                sx={{
                  bgcolor: "#03AAFA",
                  borderRadius: "30px",
                  color: common.white,
                  "&:hover": {
                    bgcolor: "#03AAFA"
                  }
                }}
                disabled={
                  formValue.title === "" ||
                  formValue.summary === "" ||
                  formValue.owner === ""
                }
              >
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewTutorial;
