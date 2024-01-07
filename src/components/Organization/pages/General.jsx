import React, { useCallback, useState,useEffect,useRef } from "react";
import {
  Grid,
  Typography,
  InputBase,
  Button,
  Fab,
  Avatar,
  CircularProgress
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import UndoIcon from '@mui/icons-material/Undo';
import "./Tags.css";
import LinearProgress from "@mui/material/LinearProgress";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import OrgDelete from "../OrgUsers/OrgDelete";
import { useDispatch, useSelector } from "react-redux";
import { NoImage } from "../../../helpers/images";
import {
  uploadOrgProfileImage,
  clearEditGeneral,
  editGeneralData
} from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import ChangeProfile from "../../Profile/ChangeProfile/ChangeProfile";
import { useDebouncedEffect } from "../../../helpers/customHooks/useDebounce";
import useWindowSize from "../../../helpers/customHooks/useWindowSize";

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    [theme.breakpoints.down("md")]: {
      width: "99%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "99%"
    },
    marginTop: "20px"
  },
  save: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px",
    padding: 20,
    flex: 1
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: 100
  },
  input: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginTop: "10px",
    width: "90%"
  },
  input2: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginTop: "10px",
    width: "100%"
  },
  button: {
    boxShadow: "none",
    borderRadius: "25px",
    border: 0,
    backgroundColor: theme.palette.grey[200],
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`
  },
  hashbutton: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px",
    padding: 5,
    [theme.breakpoints.down("md")]: {
      width: "80%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "99%"
    }
  },
  hashtag: {
    boxShadow: "none",
    borderRadius: "25px",
    border: 0,
    direction: "column",
    backgroundColor: theme.palette.grey[200],
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`
  },
  ProfilePhotoImage: {
    width: theme.spacing(12),
    height: theme.spacing(12)
  },
  ProfileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  LoadingData: {
    opacity: 0.5,
    fontStyle: "italic",
    fontSize: "0.8rem"
  }
}));

const base64StringToFile = (base64String, filename) => {
  let arr = base64String.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

/**
 * @description - This component is used to edit the general details of the organization.
 * @returns {React.Component}
 */
function General() {
  const classes = useStyles();

  // Image Uploading And Cropping Hooks
  const [imageUploading, setImageUploading] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);

  // Firebase Hooks
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const windowSize = useWindowSize();
  const CurrentOrg = useSelector(
    ({
      profile: {
        data: { organizations }
      },
      org: {
        general: { current }
      }
    }) => organizations.find(element => element.org_handle === current)
  );

  const profileOrganizations = useSelector(
    ({
      profile: {
        data: { organizations }
      }
    }) => organizations
  );

  // State Hooks
  const [isUpdating, setIsUpdating] = useState(false);
  const [OrgData, setOrgData] = useState(CurrentOrg);
  useDebouncedEffect(
    () => {
      EditOrg();
    },
    [OrgData],
    2000
  );

  const handleChange = name => event => {
    setOrgData({ ...OrgData, [name]: event.target.value });
  };
  const [itemList, setItemList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const itemsToShow = 8; // Number of items to show at a time
  const maxDropdownHeight = 150;
  const dummyItems = [
    'C', 'C++', 'Java', 'JavaScript', 'Python', 'Ruby', 'Swift', 'TypeScript',
    'C#', 'PHP', 'Go', 'Kotlin', 'Rust', 'Scala', 'Julia', 'D', 'Haskell', 'Elixir',
    'Clojure', 'Lua', 'Perl', 'Assembly', 'Fortran', 'HTML', 'CSS', 'Matlab', 'R',
    'SAS', 'VBA', 'SwiftUI', 'Flutter', 'React Native', 'Qt', 'wxWidgets', 'Gtk+',
    'Tkinter', 'Android', 'iOS', 'WebAssembly', 'React', 'Vue.js', 'Angular', 'Svelte',
    'Ember.js', 'Django', 'Flask', 'Rails', 'Laravel', 'ASP.NET Core', 'Spring Boot',
    'Express.js', 'Koa.js', 'Nest.js', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas',
    'NumPy', 'Matplotlib', 'Seaborn', 'Bokeh', 'Plotly', 'Docker', 'Kubernetes',
    'Apache Spark', 'Apache Hadoop', 'Cassandra', 'Kafka', 'MongoDB', 'MySQL',
    'PostgreSQL', 'Elasticsearch', 'Prometheus', 'Grafana', 'Kibana', 'Logstash',
    'Terraform', 'Ansible', 'Puppet', 'Chef', 'Docker Compose', 'Kubernetes Helm',
    'Istio', 'ServiceMesh', 'gRPC', 'Protobuf', 'Thrift', 'Apache Camel',
    'Apache Mule ESB', 'Apache Kafka Streams', 'Spring Integration',
    'Oracle Fusion Middleware', 'IBM Integration Bus', 'TIBCO ActiveMatrix BusinessWorks Plus',
    'Azure Logic Apps', 'AWS Step Functions', 'Google Cloud Functions'
];

  const inputRef = useRef(null);

  useEffect(() => {
    // Close the dropdown when clicking outside the input and list
    const handleOutsideClick = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const showItems = () => {
    setShowDropdown(true);
  };

  const addItem = (item) => {
    setSelectedItems([...selectedItems, item]);
    setFilterText('');
    setShowDropdown(false);
    const updatedTags = OrgData.org_tags ? `${OrgData.org_tags},${item}` : item;

    setOrgData({ ...OrgData, org_tags: updatedTags });
  };

  const resetItems = () => {
    setSelectedItems([]);
    // Create a new object to trigger a re-render
    setOrgData((prevOrgData) => ({ ...prevOrgData, org_tags: ' ' }));
  };

  const handleFilterChange = (event) => {
    const text = event.target.value;
    setFilterText(text);

    // If the filter text is empty, show all items
    if (!text.trim()) {
      setItemList([]);
      setShowDropdown(true);
      return;
    }

    // Filter the items based on the input text and show only a certain number
    const filteredItems = dummyItems
      .filter((item) => item.toLowerCase().includes(text.toLowerCase()))
      .slice(0, itemsToShow);
    setItemList(filteredItems);
    setShowDropdown(true);
  };

  const saveImage = (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }
    setShowImageDialog(false);
    uploadImage(base64StringToFile(canvas.toDataURL(), "newfile"));
  };

  const uploadImage = file => {
    setIsUpdating(true);
    uploadOrgProfileImage(
      file,
      CurrentOrg.org_handle,
      CurrentOrg
    )(firebase, dispatch).then(() => {
      setIsUpdating(false);
      setImageUploading(false);
      clearEditGeneral()(dispatch);
    });
    return false;
  };

  const EditOrg = useCallback(() => {
    setIsUpdating(true);
    editGeneralData(
      {
        ...OrgData,
        org_handle: CurrentOrg.org_handle,
        org_image: CurrentOrg.org_image
      },
      profileOrganizations
    )(firebase, firestore, dispatch).then(() => {
      setIsUpdating(false);
    });
  }, [
    profileOrganizations,
    OrgData,
    dispatch,
    firebase,
    firestore,
    CurrentOrg
  ]);

  console.log(OrgData);
  return (
    <React.Fragment>
      <div data-testid="organization-general-page">
        <Grid item container spacing={6} alignItems="center">
          <Grid item>
            <Typography className={classes.heading}>General</Typography>
          </Grid>
          <Grid item container xs={4} spacing={2}>
            {isUpdating ? (
              <React.Fragment>
                <Grid item>
                  <CircularProgress
                    style={{
                      color: "black"
                    }}
                    size={16}
                    className={classes.LoadingData}
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.LoadingData}>
                    Updating Info...
                  </Typography>
                </Grid>
              </React.Fragment>
            ) : (
              <Grid item>
                <Typography className={classes.LoadingData}>
                  Data Updated
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Grid item container spacing={2}>
            <Grid item xs={windowSize.width <= 500 ? 12 : 6}>
              <Typography>Organization Name</Typography>
              <InputBase
                className={classes.input}
                placeholder="Organization Name"
                value={OrgData.org_name}
                onChange={handleChange("org_name")}
              />
            </Grid>
            <Grid item xs={windowSize.width <= 500 ? 12 : 6}>
              <Typography>Organization Handle</Typography>
              <InputBase
                className={classes.input}
                placeholder="Organization Handle"
                disabled
                value={OrgData.org_handle}
                onChange={handleChange("org_handle")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Website URL</Typography>
              <InputBase
                className={classes.input}
                placeholder="https://Website URL"
                value={OrgData.org_website}
                onChange={handleChange("org_website")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>FaceBook URL</Typography>
              <InputBase
                className={classes.input}
                placeholder="https://Facebook URL"
                value={OrgData.org_link_facebook}
                onChange={handleChange("org_link_facebook")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Github URL</Typography>
              <InputBase
                className={classes.input}
                placeholder="https://github.com/ Github Handle"
                value={OrgData.org_link_github}
                onChange={handleChange("org_link_github")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Linkeldin URL</Typography>
              <InputBase
                className={classes.input}
                placeholder="https://LInkeldin URL"
                value={OrgData.org_link_linkedin}
                onChange={handleChange("org_link_linkedin")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Twitter URL</Typography>
              <InputBase
                className={classes.input}
                placeholder="https://Twitter URL"
                value={OrgData.org_link_twitter}
                onChange={handleChange("org_link_twitter")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Profile Image</Typography>
              <Grid container direction="column">
                <Grid item container alignItems="center">
                  <Grid item xs={2} className={classes.ProfileContainer}>
                    {CurrentOrg.org_image ? (
                      <Avatar
                        src={CurrentOrg.org_image}
                        className={classes.ProfilePhotoImage}
                      />
                    ) : (
                      <img src={NoImage} alt="Not Available" />
                    )}
                  </Grid>

                  <Grid item>
                    {imageUploading ? (
                      <LinearProgress />
                    ) : (
                      <Box mt={4} mb={6} m={0}>
                        <center>
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.ProfilePhoto}
                            startIcon={<CloudUploadIcon />}
                            onClick={() => setShowImageDialog(true)}
                          >
                            Choose File
                          </Button>
                        </center>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.root}>
          <Grid item xs={windowSize.width <= 500 ? 12 : 6}>
            <CardContent>
              <Typography>Brief description</Typography>
              <div>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  rows={4}
                  fullWidth={true}
                  variant="filled"
                  value={OrgData.org_description}
                  onChange={handleChange("org_description")}
                />
              </div>
              {console.log(OrgData)}
              <Typography style={{marginTop:"10px"}}>Select tags</Typography>
              <div className="tags-input" onClick={showItems} ref={inputRef} style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Type to filter"
          id="input-tag"
          value={filterText}
          onChange={handleFilterChange}
        />
        {showDropdown && (
          <ul id="tags"
            style={{
              background:"white",
              maxHeight: maxDropdownHeight + 'px',
              overflowY: 'auto',
              marginTop:'5px',
              cursor:"pointer",
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1,
            }}
          >
            {itemList.map((item, index) => (
              <li key={`item-${index}`} onClick={() => addItem(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>


              <Grid style={{marginTop:"10px"}} item xs={16} className={classes.hashbutton}>

                <div >

      <Typography>Selected Tags</Typography>
      <div>
        {selectedItems.map((item, index) => (
          <Button style={{margin:"2px"}} className={classes.hashtag} disableRipple key={index}>{item}</Button>
        ))}
      </div>


      <Button  variant="outlined"
                color="primary"
               startIcon={<UndoIcon />} 
               style={{margin:"5px"}} onClick={resetItems}>Reset</Button>
    </div>
              </Grid>
            </CardContent>
          </Grid>
        </div>
        <Grid className={classes.root}>
          <OrgDelete />
        </Grid>
      </div>
      <ChangeProfile
        saveImage={saveImage}
        open={showImageDialog}
        onClose={() => setShowImageDialog(false)}
      />
    </React.Fragment>
  );
}

export default General;
