import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  addOrgUser,
  getOrgUserData,
  removeOrgUser,
  searchFromIndex,
} from '../../../store/actions';
import { useFirestore } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import AddOrgUserModal from './addOrgUserModal';
import _ from 'lodash';

const permissionLevelIcons = [
  <VisibilityIcon />,
  <EditIcon />,
  <VerifiedUserIcon />,
  <InsertEmoticonIcon />,
];

const permissionLevelTitles = ['Reviewer', 'Editor', 'Admin', 'Owner'];
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
});

const DialogTitle = withStyles(styles)((props) => {
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
        user: { data },
      },
    }) => data
  );
  const currentUserHandle = useSelector(
    ({
      firebase: {
        profile: { handle },
      },
    }) => handle
  );
  const currentUserPermission = useSelector(
    ({
      org: {
        general: { permissions },
      },
    }) => permissions
  );
  const currentOrgHandle = useSelector(
    ({
      org: {
        general: { current },
      },
    }) => current
  );

  const firestore = useFirestore();
  const dispatch = useDispatch();
  let userIsAdmin = [2, 3].some((e) => currentUserPermission.includes(e));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [opensnack, setOpenSnack] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const snackhandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const userProps = useSelector(({ org: { user } }) => user);
  const errorProps = useSelector(
    ({
      org: {
        user: { error },
      },
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
    { name: 'Reviewer', icon: <VisibilityIcon />, value: 'perm_0' },
    { name: 'Editor', icon: <EditIcon />, value: 'perm_1' },
    { name: 'Admin', icon: <PersonIcon />, value: 'perm_2' },
    { name: 'Delete', icon: <DeleteIcon />, value: 'remove_user' },
  ];

  const handlePermissionChange = (key, permission_level, handle) => {
    console.log(handle);
    if (key === 'remove_user') {
      removeOrgUser({
        org_handle: currentOrgHandle,
        handle,
      })(firestore, dispatch);
    } else if (parseInt(key.split('_')[1]) !== permission_level[0]) {
      addOrgUser({
        org_handle: currentOrgHandle,
        handle,
        permissions: parseInt(key.split('_')[1]),
      })(firestore, dispatch);
    }
    setAnchorEl(null);
  };

  const handleOnSearch = ({ target: { value } }) => {
    if (value === '') {
      return setDataSource(data);
    }
    const result = searchFromIndex(value);
    if (result.length === 0) {
      return setDataSource([]);
    }
    if (result.length > 0) {
      let tempArray = [];
      result.forEach((item) => {
        tempArray = [
          ...tempArray,
          ..._.filter(data, (ref) => ref.handle === item.ref),
        ];
      });
      return setDataSource(tempArray);
    }
  };

  return (
    <>
      <Card>
        <CardHeader
          style={{ borderBottom: ' 1px solid  black' }}
          title="Organization Users"
          className="max-height-mobile"
          action={
            [2, 3].some((e) => currentUserPermission.includes(e)) && (
              <div>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClickOpen}
                  startIcon={<AddIcon />}
                >
                  Add New
                </Button>

                <Dialog open={open} onClose={handleCloseDialog}>
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
        />{' '}
        <Box mt={2} mb={2} m={3}>
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
                    {' '}
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
                                  style={{ color: index === 3 ? 'red' : '' }}
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
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}
                                  >
                                    {option.icon}
                                    <div style={{ paddingLeft: '5px' }}>
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
              })}{' '}
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
