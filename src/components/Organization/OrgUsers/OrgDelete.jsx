import { Button, Dialog, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import OrgDeleteModal from "./OrgDeleteModal";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px"
  },
  gridPadding: {
    padding: theme.spacing(2)
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
  button: {
    boxShadow: "none",
    borderRadius: "10px",
    border: 0,
    backgroundColor: theme.palette.grey[100],
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`
  },
  heading: {
    [theme.breakpoints.down("md")]: {
      fontSize: theme.typography.subtitle1.fontSize
    }
  },
  body: {
    [theme.breakpoints.down("md")]: {
      fontSize: theme.typography.subtitle2.fontSize
    }
  }
}));

/**
 * @description Delete organization component
 */
function OrgDelete() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Paper elevation={0} className={classes.root} data-testid="org-delete">
        
        <Grid container className={classes.gridPadding}>
          <Grid container direction="row">
            <Grid item container xs={12} md={10} direction="column">
              <Grid item>
                <Typography className={classes.heading}>
                  Delete this organization ?
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" className={classes.body}>
                  Once deleted, it will be gone forever. Please be certain.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              md={2}
              justifyContent="flex-end"
              alignItems="center"
              className={classes.buttonDiv}
            >
              <Button
                color="secondary"
                className={classes.button}
                onClick={() => setOpen(true)}
                data-testid="org-delete-button"
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="org-delete-modal-title"
        aria-describedby="org-delete-modal-description"
      >
        <OrgDeleteModal />
      </Dialog>
    </React.Fragment>
  );
}

export default OrgDelete;
