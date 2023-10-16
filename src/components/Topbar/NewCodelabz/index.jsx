import { Grid, IconButton, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast} from 'react-toastify';

const useStyles = makeStyles(theme => ({
  root: {
    height: theme.spacing(8),
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    margin: "0.5rem",
    "&:hover": {}
  },
  flex: {
    display: "flex",
    flexDirection: "row"
  },
  iconDiv: {
    padding: theme.spacing(1)
  },
  title: {
    fontWeight: "normal",
    fontSize: theme.spacing(2)
  },
  description: {
    fontSize: theme.spacing(1.5)
  }
}));

function NewCodelabz({ setVisibleModal }) {
  const classes = useStyles();
  const profileData = useSelector(({ firebase: { profile } }) => profile);
  const history=useHistory()
  const SetModalVisibility = () => {
    if (profileData.isEmpty) {
      toast.info('Login first to create a tutorial', {position: "top-center"});
      history.push("/login")
    } else {
      setVisibleModal(true)
    }
  }

  return (
    <React.Fragment>
      <Paper className={classes.root} data-testId="homepageNewCodelabz">
        <Grid
          spacing={0}
          justifyContent="flex-start"
          alignItems="center"
          className={classes.flex}
        >
          <Grid
            item
            className={classes.iconDiv}
            justifyContent="center"
            alignContent="center"
            data-testId="NewCodelabzBtn"
            onClick={SetModalVisibility}
          >
            <AddBoxRoundedIcon color="primary" fontSize="large" />
          </Grid>
          <Grid item container sm={9} direction="column">
            <Typography variant="h6" className={classes.title}>
              New Codelabz
            </Typography>
            <Typography variant="body2" className={classes.description}>
              Share a tutorial
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}

export default NewCodelabz;
