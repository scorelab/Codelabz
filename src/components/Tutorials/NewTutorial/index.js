import React, { useEffect, useState } from "react";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createTutorial } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Divider from '@material-ui/core/Divider';
import { IconButton, Input } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import {deepPurple} from '@material-ui/core/colors';
import {Typography } from "@material-ui/core";
import ImageIcon from '@material-ui/icons/Image';
import DescriptionIcon from '@material-ui/icons/Description';
import MovieIcon from '@material-ui/icons/Movie';import { log } from "@craco/craco/lib/logger";
;
// import Input from "@material-ui/core";

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
    owner: "",
    display_data:{
      type:"",
      data:""
    }
  });

  const loadingProp = useSelector(
    ({
      tutorials: {
        create: { loading },
      },
    }) => loading
  );
  const errorProp = useSelector(
    ({
      tutorials: {
        create: { error },
      },
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
        data: { organizations },
      },
    }) => organizations
  );

  const userHandle = useSelector(
    ({
      firebase: {
        profile: { handle },
      },
    }) => handle
  );

  const displayName = useSelector(
    ({
      firebase: {
        profile: { displayName },
      },
    }) => displayName
  );
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

  const onSubmit = async(formData) => {
    console.log(formData);
    formData.preventDefault();
   const url =  await firebase.uploadFile("display_data",formValue.display_data.data)
   setformValue((prev)=>({
      ...prev,
      display_data:{
        type:formData.display_data.type,
        data:url
      }
   }))
   console.log(formValue);
    const tutorialData = {
      ...formValue,
      created_by: userHandle,
      is_org: userHandle !== formValue.owner,
    };
    console.log(tutorialData);
    createTutorial(tutorialData)(firebase, firestore, dispatch, history);
  };

  const onOwnerChange = (e) => {
    console.log(e.target.value);
    setformValue((prev) => ({
      ...prev,
      owner: e.target.value,
    }));
  };

  const handleChange = (name,e) => {
    e.persist();
    if(name =="image" || name=="video"){
      setformValue((prev)=>({
        ...prev,
        display_data:{
          type:name,
          data:e.target.value
        }
      }))
    }
    else {
      setformValue((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    }
    console.log(formValue);
   
  };
  const handleFileChange = (e) => {
    console.log(e);
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      paddingTop: "8px",
      paddingBottom: "10px",
    },
    item:{
      margin: "10px"
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }));
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
        justifyContent: "center",
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
          maxWidth: "80%",
        }}
      >
        {error && (
          <Alert message={""} severity="error" type="error" closable="true" className="mb-24">
            description={"Tutorial Creation Failed"}/
          </Alert>
        )}
        <h2>Create a Tutorial</h2>
        <Divider/>
        <br/>
        
          <div className={classes.root}>
          <Avatar className={classes.purple}>
            {displayName ? displayName[0] : sampleName[0]}
          </Avatar>
          <Typography className={classes.item}>
            {displayName || sampleName}
          </Typography>
          </div>
            
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
              id="newTutorialTitle"
              style={{ marginBottom: "2rem" }}
              onChange={(e) => handleChange("title",e)}
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
              onChange={(e) => handleChange("summary",e)}
              style={{ marginBottom: "2rem" }}
            />
            {/* <Select
              onChange={onOwnerChange}
              fullWidth
              style={{ marginBottom: "2rem" }}
              value={formValue.owner}
              id="newTutorialSelect"
            >
              <MenuItem value={userHandle}>{displayName}</MenuItem>
              {orgList?.map((item) => {
                return (
                  <MenuItem value={item.org_handle}>{item.org_name}</MenuItem>
                );
              })}
            </Select> */}
            <div style={{
              display:"flex",
            }} 
            >
            <div>
            <IconButton>
            <label htmlFor="image1">
              <ImageIcon style={{cursor:"pointer"}}/>
            </label>
            </IconButton>
            <Input type="file" name="image" id="image1" style={{display:"none"}}   accept="image/*" onChange={(e)=>{handleChange("image",e)}}  ></Input>
            </div>
            <div>
            <IconButton>
            <label htmlFor="video">
              <MovieIcon style={{cursor:"pointer"}}/>
            </label>
            </IconButton>
            <Input type="file" id="video" style={{display:"none"}} name="image" accept="video/*" onChange={(e)=>{handleChange("video",e)}}></Input>
            </div>
            </div>
            {/* <Input type="file" accept=""><IconButton><MovieIcon/></IconButton></Input> */}
            {/* <Input type><IconButton><DescriptionIcon/></IconButton></Input> */}
            
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
                  onClick={(e) => onSubmit(e)}
                  style={{ backgroundColor: "#03AAFA", borderRadius: "30px" }}
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
