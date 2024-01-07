import React, { useEffect } from "react";
import { Box, Card, Typography } from "@mui/material";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserProfile } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import Swal from 'sweetalert2'

const UserAccount = () => {
  const classes = useStyles();
  const currentUserHandle = useSelector(
    ({
      firebase: {
        profile: { handle }
      }
    }) => handle
  );
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const firebase = useFirebase()
  useEffect(()=>{
    console.log(currentUserHandle)
  },[])

  const deleteUserHandle = () =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then( async (result) => {
      if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your user has been deleted.",
            icon: "success"
          });
        await deleteUserProfile(currentUserHandle)(firebase,firestore,dispatch)
        
      }
    })
    
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
        <Typography
          className={classes.text}
          style={{ color: "#FF5959", marginBottom: 10 }}
          data-testId="deactivateAccount"
        >
          Deactivate account
        </Typography>
        <Typography
          className={classes.text}
          style={{ color: "#FF5959" }}
          data-testId="deleteAccount"
          onClick={deleteUserHandle}
        >
          Delete account
        </Typography>
      </Box>
    </Card>
  );
};

export default UserAccount;
