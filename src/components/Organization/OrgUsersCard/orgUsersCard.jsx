import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { withStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrgUser,
  getOrgUserData,
  removeOrgUser,
  searchFromIndex
} from "../../../store/actions";
import { useFirestore } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";
import AddOrgUserModal from "./addOrgUserModal";
import _ from "lodash";

const permissionLevelIcons = [
  <VisibilityIcon />,
  <EditIcon />,
  <VerifiedUserIcon />,
  <InsertEmoticonIcon />
];

const permissionLevelTitles = ["Reviewer", "Editor", "Admin", "Owner"];
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1)
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const OrgUsersCard = () => {
  const data = useSelector(
    ({
      org: {
        user: { data }
      }
    }) => data
  );
  const currentUserHandle = useSelector(
    ({
      firebase: {
        profile: { handle }
      }
    }) => handle
  );
  const currentUserPermission = useSelector(
    ({
      org: {
        general: { permissions }
      }
    }) => permissions
  );
  const currentOrgHandle = useSelector(
    ({
      org: {
        general: { current }
      }
    }) => current
  );

  const firestore = useFirestore();
  const dispatch = useDispatch();
  let userIsAdmin = [2, 3].some(e => currentUserPermission.includes(e));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [opensnack, setOpenSnack] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const snackhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const userProps = useSelector(({ org: { user } }) => user);
  const errorProps = useSelector(
    ({
      org: {
        user: { error }
      }
    }) => error
  );

  useEffect(() => {
    getOrgUserData(currentOrgHandle)(firestore, dispatch);
  }, [currentOrgHandle, firestore, dispatch]);

  useEffect(() => {
    setError(errorProps);
  }, [errorProps]);

  useEffect(() => {
    if (!isLoaded(userProps) && isEmpty(userProps)) {
      setLoading(true);
    }
    if (isLoaded(userProps) && !isEmpty(userProps)) {
      setLoading(false);
    }
    if (isLoaded(userProps) && isEmpty(userProps)) {
      setLoading(false);
    }
  }, [userProps]);

  useEffect(() => {
    if (isLoaded(userProps) && !isEmpty(userProps) && error === false) {
      setOpenSnack(true);
      setOpen(false);
    }
  }, [userProps, error]);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const options = [
    { name: "Reviewer", icon: <VisibilityIcon />, value: "perm_0" },
    { name: "Editor", icon: <EditIcon />, value: "perm_1" },
    { name: "Admin", icon: <PersonIcon />, value: "perm_2" },
    { name: "Delete", icon: <DeleteIcon />, value: "remove_user" }
  ];

  const handlePermissionChange = (key, permission_level, handle) => {
    console.log(handle);
    if (key === "remove_user") {
      removeOrgUser({
        org_handle: currentOrgHandle,
        handle
      })(firestore, dispatch);
    } else if (parseInt(key.split("_")[1]) !== permission_level[0]) {
      addOrgUser({
        org_handle: currentOrgHandle,
        handle,
        permissions: parseInt(key.split("_")[1])
      })(firestore, dispatch);
    }
    setAnchorEl(null);
  };

  const handleOnSearch = ({ target: { value } }) => {
    if (value === "") {
      return setDataSource(data);
    }
    const result = searchFromIndex(value);
    if (result.length === 0) {
      return setDataSource([]);
    }
    if (result.length > 0) {
      let tempArray = [];
      result.forEach(item => {
        tempArray = [
          ...tempArray,
          ..._.filter(data, ref => ref.handle === item.ref)
        ];
      });
      return setDataSource(tempArray);
    }
  };

  return (
    <>
      <Card>
        <CardHeader
          style={{ borderBottom: " 1px solid  black" }}
          title="Organization Users"
          className="max-height-mobile"
          action={
            [2, 3].some(e => currentUserPermission.includes(e)) && (
              <div>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClickOpen}
                  startIcon={<AddIcon />}
                  id="addNewUser"
                >
                  Add New
                </Button>

                <Dialog
                  open={open}
                  onClose={handleCloseDialog}
                  id="addNewUserDialog"
                >
                  <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleCloseDialog}
                  >
                    {`Add new user to ${currentOrgHandle}`}
                  </DialogTitle>

                  <DialogContent dividers>
                    <AddOrgUserModal currentOrgHandle={currentOrgHandle} />
                  </DialogContent>
                </Dialog>
              </div>
            )
          }
        />{" "}
        <Box mt={2} mb={2} m={3} data-testId="orgUserCard">
          <Grid xs={12} md={12} lg={12} item={true}>
            <List
              subheader={
                <ListSubheader>
                  <InputLabel htmlFor="search_handle_name">
                    Search users by name or handle
                  </InputLabel>
                  <Input
                    id="search_handle_name "
                    onChange={handleOnSearch}
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    }
                  />
                </ListSubheader>
              }
            >
              {dataSource.map((item, i) => {
                return (
                  <div key={i}>
                    {" "}
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={item.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Link to={`/user/${item.handle}`}>{item.name}</Link>
                        }
                        secondary={`@${item.handle}`}
                      />
                      {/*             //owner can't change their permissions but can change anyone else's
                //admin can't change owner's and their own permissions but can change others' except owners
                //others can't change anyone's permissions */}
                      {item.permission_level[0] === 3 ? (
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          disabled
                          startIcon={
                            permissionLevelIcons[item.permission_level[0]]
                          }
                        >
                          Owner
                        </Button>
                      ) : item.handle === currentUserHandle ? (
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          disabled
                          startIcon={
                            permissionLevelIcons[item.permission_level[0]]
                          }
                        >
                          {permissionLevelTitles[item.permission_level[0]]}
                        </Button>
                      ) : userIsAdmin ? (
                        <>
                          {loading ? (
                            <Button disabled>Changing Permission</Button>
                          ) : (
                            <Button
                              aria-controls="simple-menu"
                              aria-haspopup="true"
                              startIcon={
                                permissionLevelIcons[item.permission_level[0]]
                              }
                              onClick={handleClick}
                            >
                              {permissionLevelTitles[item.permission_level[0]]}
                            </Button>
                          )}

                          <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            {options.map((option, index) => (
                              <div key={index}>
                                <MenuItem
                                  style={{ color: index === 3 ? "red" : "" }}
                                  onClick={() =>
                                    handlePermissionChange(
                                      option.value,
                                      item.permission_level[0],
                                      item.handle
                                    )
                                  }
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between"
                                    }}
                                  >
                                    {option.icon}
                                    <div style={{ paddingLeft: "5px" }}>
                                      {option.name}
                                    </div>
                                  </div>
                                </MenuItem>
                                {index === 2 ? <Divider /> : null}
                              </div>
                            ))}
                          </Menu>
                        </>
                      ) : (
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          disabled
                          startIcon={<DeleteIcon />}
                        >
                          {permissionLevelTitles[item.permission_level[0]]}
                        </Button>
                      )}
                    </ListItem>
                  </div>
                );
              })}{" "}
            </List>
          </Grid>
        </Box>
      </Card>
      <Snackbar
        open={opensnack}
        autoHideDuration={3000}
        onClose={snackhandleClose}
      >
        <Alert onClose={snackhandleClose} severity="success">
          Changes Saved!
        </Alert>
      </Snackbar>
    </>
  );
};

export default OrgUsersCard;
