import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { validateHandle } from "../../../helpers/validations";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import {
  checkUserHandleExists,
  checkAdminExists,
  checkAdminEmail,
  checkContributorExists,
  checkContributorEmail,
  areRolesMutuallyExclusive,
  getOrgData
} from "../../../store/actions";
import { addOrgAdmins, addOrgContributors, removeOrgUsers } from "../../../store/actions";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { fetchAdmins, fetchContributors } from "../../../store/actions";



const useStyles = makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px"
  },
  gridPadding: {
    padding: theme.spacing(2)
  },
  button: {
    width: "150px",
    boxShadow: "none",
    borderRadius: "10px",
    marginBottom: "5px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightMedium
  },
  body: {
    fontSize: theme.typography.pxToRem(12)
  },
  userCard: {
    padding: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.background.default
    },
    borderRadius: "10px"
  },
  userList: {
    marginTop: theme.spacing(2)
  },
  userName: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightMedium
  },
  userDesignation: {
    fontSize: theme.typography.pxToRem(14),
    paddingLeft: theme.spacing(0.5),
    fontWeight: theme.typography.fontWeightLight
  },
  viewMore: {
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    cursor: "pointer"
  },
  buttonDiv: {
    [theme.breakpoints.down("md")]: {
      justifyContent: "flex-start",
      paddingTop: theme.spacing(2)
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-end"
    }
  },
  addpopup_overlay: {
    position: "absolute",
    top: 200,
    left: 500,
    width: "40%",
    height: "50%",
    backgroundColor: "white",
    boxShadow:
      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
    zIndex: "9999m"
  },
  addpopup: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    width: "90%",
    height: "80%"
    // border:"1px solid black"
  },
  inputfield: {
    border: "none",
    backgroundColor: "#E0E0E0",
    // color:"white",
    borderRadius: "10px",
    height: "50%",
    textAlign: "center"
  },
  submit: {
    border: "none",
    backgroundColor: "#999999",
    color: "white",
    borderRadius: "10px",
    height: "50%",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#666666" // Change background color on hover
    }
  },

  errorDiv: {
    display: "flex",
    border: "1px solid red",
    height: "100px"
  },
  errorMessage: {
    marginLeft: "29%",
    color: "red"
  },
  errorIcon: {
    height: "100%",
    width: "7%",
    color: "red",
    mixBlendMode: "multiply"
  },
  removepopup_overlay: {

    // width: "100%",
    // height: "5%",
    display: "flex",
    backgroundColor: "white",
    boxShadow:
      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
    zIndex: "9999m",
    alignItems: "center",
    textAlign: "center"
  },
  removepopup_input: {
    backgroundColor: "transparent",
    border: "none",
    height: "5  0%",
    fontSize: "1.25rem",
    width: "100%",
    marginLeft: "5px",
    "&:focus": {
      outline: "none"
    }
  },
  searchIcon: {
    width: "10%",
    height: "90%"
  },
  suggestionDiv: {
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 0px 8px #ddd",
    borderRadius: "10px",
    marginTop: "1rem",
    maxHeight: "100px",
    overflowY: "auto"
  },
  remove_container: {
    position: "absolute",
    top: 200,
    left: 500,
    height: "fit-content",
    width: "fit-content"
  },
  suggestion: {
    padding: "10px 20px",
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    "&:hover": {
      backgroundColor: "#efefef",
    }
  },
  remove_btn: {
    height: "60px",
    width: "70px",
    color: "white",
    backgroundColor: "#999999",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    border: "none"
  }
}));

function Orgusers({
  Users,
  title,
  description,
  AddUser,
  isViewMore,
  dataTestId,
  org_handle
}) {
  const classes = useStyles();
  const [showPopUp, setShowPopUp] = useState(false);
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const [handleValidateError, setHandleValidateError] = useState(false);
  const [handleValidateErrorMessage, setHandleValidateErrorMessage] =
    useState("");

  const [orgUserHandle, setOrgUserHandle] = useState("");
  const [orgUserEmail, setOrgUserEmail] = useState("");
  const [orgUserDesignation, setOrgUserDesignation] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [orgUsers, setOrgUsers] = useState(Users);
  const [isAdd, setIsAdd] = useState(false);

  const fetchData = async users => {
    try {
      if (users == "Admins") {
        const admins = await fetchAdmins(org_handle)(firebase, dispatch);
        setOrgUsers(admins);
      } else {
        const contributors = await fetchContributors(org_handle)(
          firebase,
          dispatch
        );
        setOrgUsers(contributors);
      }
    } catch (error) {
      console.error("Error fetching Org Users", error);
    }
  };

  const addNewOrgUser = async e => {
    setLoading(true);
    e.stopPropagation();
    e.preventDefault();

    const exists = await checkUserHandleExists(orgUserHandle)(
      firebase,
      dispatch
    );
    if (exists) {
      if (Users[0].hasOwnProperty("adminHandle")) {
        const adminHandleExists = await checkAdminExists(
          orgUserHandle,
          org_handle
        )(firebase, dispatch);
        if (!adminHandleExists) {
          const adminEmailValid = await checkAdminEmail(
            orgUserHandle,
            orgUserEmail
          )(firebase, dispatch);
          if (adminEmailValid) {
            const rolesMutuallyExclusive = await areRolesMutuallyExclusive(
              "contributors",
              orgUserHandle,
              org_handle
            )(firebase, dispatch);
            if (!rolesMutuallyExclusive) {
              addOrgAdmins(
                org_handle,
                orgUserHandle,
                orgUserEmail,
                orgUserDesignation
              )(firestore, dispatch).then(() => {
                setLoading(false);
                Swal.fire({
                  title: "Admin Added !",
                  text: "You clicked the button!",
                  icon: "success"
                });
              });
              setShowPopUp(false);
              fetchData("Admins");
            } else {
              setLoading(false);
              setErrorMessage("User is already added as Contributor");
              setError(true);
            }
          } else {
            setLoading(false);
            setErrorMessage("Email is not registered for this user");
            setError(true);
          }
        } else {
          setLoading(false);
          setErrorMessage("Admin already exists !");
          setError(true);
        }
      } else {
        const contributorHandleExists = await checkContributorExists(
          orgUserHandle,
          org_handle
        )(firebase, dispatch);
        if (!contributorHandleExists) {
          const contributorEmailValid = await checkContributorEmail(
            orgUserHandle,
            orgUserEmail
          )(firebase, dispatch);
          if (contributorEmailValid) {
            const rolesMutuallyExclusive = await areRolesMutuallyExclusive(
              "admins",
              orgUserHandle,
              org_handle
            )(firebase, dispatch);
            if (!rolesMutuallyExclusive) {
              addOrgContributors(
                org_handle,
                orgUserHandle,
                orgUserEmail,
                orgUserDesignation
              )(firestore, dispatch).then(() => {
                setLoading(false);
                Swal.fire({
                  title: "Contributor Added !",
                  text: "You clicked the button!",
                  icon: "success"
                });
              });
              setShowPopUp(false);
              fetchData("Contributors");
            } else {
              setLoading(false);
              setErrorMessage("User is already added as an Admin");
              setError(true);
            }
          } else {
            setLoading(false);
            setErrorMessage("Email is not registered for this user");
            setError(true);
          }
        } else {
          setLoading(false);
          setErrorMessage("Contributor already exists !");
          setError(true);
        }
      }
    } else {
      setLoading(false);
      setErrorMessage("User doesn't exists !");
      setError(true);
    }
  };

  const AddUserPopUp = () => {
    if (Users[0].hasOwnProperty("adminHandle")) {
      setIsAdmin(true);
      setIsAdd(true);
      setShowPopUp(!showPopUp);
    } else {
      setIsAdmin(false);
      setIsAdd(true);
      setShowPopUp(!showPopUp);
    }
  };

  const RemoveUserPopUp = () => {
    if (Users[0].hasOwnProperty("adminHandle")) {
      setIsAdd(false);
      setIsAdmin(true);
      setShowPopUp(!showPopUp);
    } else {
      setIsAdd(false);
      setIsAdmin(false);
      setShowPopUp(!showPopUp);
    }
  };

  const closePopUp = () => {
    if (showPopUp) {
      setShowPopUp(false);
    }
  };
  const [searchValue, setSearchValue] = useState("");

  const [suggestions, setSuggestions] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const suggestionClicked = (selectedItem) => {
    setIsTyping(false)
    setSearchValue(selectedItem)
  }

  const handleSearchChange = async value => {
    setSearchValue(value);
    setIsTyping(true)
    try {
      let records
      let results
      if (isAdmin) {
        records = await fetchAdmins(org_handle)(firebase, dispatch);
        results = records.filter(record => {
          return (
            record &&
            record.adminHandle &&
            record.adminHandle.toLowerCase().includes(value.trim().toLowerCase())
          );
        });
      } else {
        records = await fetchContributors(org_handle)(firebase, dispatch);
        results = records.filter(record => {
          return (
            record &&
            record.contributorHandle &&
            record.contributorHandle.toLowerCase().includes(value.trim().toLowerCase())
          );
        });
      }

      setSuggestions(results);
    } catch (e) {
      console.error("Error while fetching the Org Users", e);
    }
  };

  const removeUser = async () => {
    if(searchValue.length > 0){
      if (isAdmin){
        const result=await removeOrgUsers("admin",searchValue,org_handle)(firebase, dispatch);
        setOrgUsers(result)
        setSearchValue('')
        setShowPopUp(false)
        Swal.fire({
          title: "Admin Deleted !",
          text: "You clicked the button!",
          icon: "success"
        });
      }else{
        const result=await removeOrgUsers("contributor",searchValue,org_handle)(firebase, dispatch);
        setOrgUsers(result)
        setSearchValue('')
        setShowPopUp(false)
        Swal.fire({
          title: "Contributor Deleted !",
          text: "You clicked the button!",
          icon: "success"
        });
      }
    }

  }


  return (
    <React.Fragment>
      {showPopUp &&
        (isAdd ? (
          <div className={`${classes.root} ${classes.addpopup_overlay}`}>
            <div className={`${classes.addpopup}`}>
              <form className={`${classes.form}`} onSubmit={addNewOrgUser}>
                <input
                  className={`${classes.inputfield}`}
                  type="text"
                  placeholder={
                    isAdmin
                      ? "Enter Admin's Handle"
                      : "Enter Contributor's Handle"
                  }
                  onChange={e => setOrgUserHandle(e.target.value)}
                  required
                />
                <input
                  className={`${classes.inputfield}`}
                  type="email"
                  placeholder={
                    isAdmin
                      ? "Enter Admin's Email"
                      : "Enter Contributor's Email"
                  }
                  onChange={e => setOrgUserEmail(e.target.value)}
                  required
                />
                <input
                  className={`${classes.inputfield}`}
                  type="text"
                  placeholder={
                    isAdmin
                      ? "Enter Admin's Designation"
                      : "Enter Contributor's Designation"
                  }
                  onChange={e => setOrgUserDesignation(e.target.value)}
                  required
                />
                {error && (
                  <div className={`${classes.errorDiv}`}>
                    <CancelOutlinedIcon
                      className={`${classes.errorIcon}`}
                      onClick={() => setError(false)}
                    />
                    <p className={`${classes.errorMessage}`}>{errorMessage}</p>
                  </div>
                )}
                <input
                  className={`${classes.submit}`}
                  type="submit"
                  value={
                    loading
                      ? "Validating ..."
                      : isAdmin
                        ? "Add Admin"
                        : "Add Contributor"
                  }
                  required
                />
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className={`${classes.remove_container}`}>
              <div className={`${classes.root} ${classes.removepopup_overlay}`}>
                <SearchOutlinedIcon className={`${classes.searchIcon}`} />
                <input
                  placeholder="Type to search..."
                  className={`${classes.removepopup_input}`}
                  value={searchValue}
                  onChange={e => handleSearchChange(e.target.value)}
                />
                <button className={`${classes.remove_btn}`} onClick={removeUser}>Remove</button>
              </div>
              {isTyping ?
                <div className={`${classes.suggestionDiv}`}>
                  {suggestions ? (
                    isAdmin ? (
                      suggestions.map((suggestion, id) => (
                        <div key={id} className={`${classes.suggestion}`} onClick={() => suggestionClicked(suggestion.adminHandle)}>{suggestion.adminHandle}</div>
                      ))
                    ) : (
                      suggestions.map((suggestion, id) => (
                        <div key={id} className={`${classes.suggestion}`} onClick={() => suggestionClicked(suggestion.contributorHandle)}>{suggestion.contributorHandle}</div>
                      ))
                    )
                  ) : (
                    <></>
                  )}
                </div>
                : (
                  <></>
                )
              }
            </div>
          </>
        ))}

      <Paper elevation={0} className={classes.root} data-testid={dataTestId}>
        <Grid container className={classes.gridPadding} onClick={closePopUp}>
          <Grid container direction="row">
            <Grid item container xs={10} direction="column">
              <Grid item>
                <Typography className={classes.heading} data-testid="org-title">
                  {title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  className={classes.body}
                  data-testid="org-description"
                >
                  {description}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container md={2} className={classes.buttonDiv}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={AddUserPopUp}
                style={{
                  display: AddUser ? "flex" : "none"
                }}
              >
                <AddIcon />
                Add New
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={RemoveUserPopUp}
                style={{
                  display: AddUser ? "flex" : "none"
                }}
              >
                <RemoveOutlinedIcon />
                Remove
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            className={classes.userList}
            data-testid="org-userlist"
          >
            {orgUsers.map((user, index) => (
              <React.Fragment key={index}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  className={classes.userCard}
                  data-testid="org-user-card"
                  spacing={2}
                >
                  <Grid
                    item
                    container
                    xs={3}
                    md={1}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {user.avatar.type === "char" ? (
                      <Avatar>{user.avatar.value}</Avatar>
                    ) : (
                      <Avatar src={user.avatar.value} />
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    md={11}
                    container
                    direction="row"
                    alignItems="center"
                  >
                    <Typography className={classes.userName}>
                      {Users[0].hasOwnProperty("adminHandle")
                        ? user.adminHandle
                        : user.contributorHandle}
                    </Typography>
                    <Typography className={classes.userDesignation}>
                      {Users[0].hasOwnProperty("adminHandle")
                        ? user.adminDesignation
                        : user.contributorDesignation}
                    </Typography>
                  </Grid>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={classes.viewMore}
          style={{
            display: isViewMore ? "flex" : "none"
          }}
        >
          <ExpandMoreIcon />
          <Typography variant="body1" className={classes.body}>
            View More
          </Typography>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}

export default Orgusers;
