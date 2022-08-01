import React, { useState} from "react";
import {
  Grid,
  Card,
  Paper,
  Typography,
  makeStyles,
  InputBase,
  Button,
  Fab,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddIcon from '@material-ui/icons/Add'
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import OrgDelete from "../OrgUsers/OrgDelete";
const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px",
    padding: 20,
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '99%',
    },
    marginTop:"20px",
  },
  save: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px",
    padding: 20,
    flex:1
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: 100,
  },
  input: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginTop: "10px",
    width: "90%",
  },
  input2: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginTop: "10px",
    width: "100%",
  },
  button: {
    boxShadow: "none",
    borderRadius: "25px",
    border: 0,
    backgroundColor: theme.palette.grey[200],
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
  },
  hashbutton: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px",
    padding: 5,
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '99%',
    },
  },
  hashtag:{
      boxShadow: "none",
      borderRadius: "25px",
    border: 0,
      direction:"column",
      backgroundColor: theme.palette.grey[200],
      padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
  },
}));

function General() {
 
  const classes = useStyles();
  const [imageUploading, setImageUploading] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
    return (
      <React.Fragment>
      
        <Grid item spacing={6}>
          <Typography className={classes.heading}>General</Typography>
        </Grid>
            <div className={classes.root}>
              <Grid container>
                <Grid item xs={6} >
                  <Typography>Organization Name</Typography>
                  <InputBase className={classes.input} placeholder="Organization Name" />
                </Grid>
                <Grid item xs={6}>
                  <Typography>Organization Handle</Typography>
                  <InputBase className={classes.input} placeholder="Organization Handle" />
                </Grid>
                <Grid item xs={12}>
                  <Typography>Website URL</Typography>
                  <InputBase className={classes.input} placeholder="https://Website URL" />
                </Grid>
                <Box item xs={12}>
                  <Typography>Profile Image</Typography>
                  {imageUploading ? (
                <LinearProgress />
              ) : (
                <Box mt={4} mb={6} m={0}>
                  <center>
                    <Button
                      size="small"
                      variant="contained"
                      id="changeProfile"
                      startIcon={<CloudUploadIcon />}
                      onClick={() => setShowImageDialog(true)}
                    >
                      Choose File
                    </Button>
                  </center>
                </Box>
              )}

                </Box>
              </Grid>
        </div>
        <div className={classes.root}>
          <Grid item xs={6} >
          <CardContent>
              <Typography>Brief description</Typography>
              <div>
              <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  rows={4}
                  fullWidth={true}
                  variant="filled"
                />
                </div>
                <Typography>Select tags</Typography>
                <Grid item xs={16} className={classes.hashbutton}>
                <Button
                color="grey"
                className={classes.hashtag}
                disableRipple
              >
                #python
                </Button>
                <Button
                color="grey"
                className={classes.hashtag}
                disableRipple >
                #javascript
              </Button>
                <Fab size="small" color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
               
            </Grid>
          </CardContent>
        </Grid>
        </div>
        <Grid className={classes.root}>
            <Box mt={4} mb={6} m={0}>
                  <center>
                    <Button
                      fullWidth
                      size="small"
                      variant="contained"
                      color="primary"
                      style={{ backgroundColor: "royalblue" }}>
                      save information
                    </Button>
                  </center>
                </Box>
            </Grid>
        <Grid className={classes.root} >
            <OrgDelete/>
        </Grid>

      </React.Fragment>
    );
  }


export default General;
