import React from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {},
  defaultButton: {
    padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
    textDecoration: "none",
    textTransform: "none",
    margin: `${theme.spacing(0)}px ${theme.spacing(0)}px ${theme.spacing(
      0
    )}px ${theme.spacing(1)}px`,
    border: "none",

    "&:hover": {
      border: "none",
      backgroundColor: theme.palette.grey[100]
    }
  },
  activeButton: {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.primary.main
  },
  inactiveButton: {
    color: theme.palette.text.secondary
  },
  itemText:{
    [theme.breakpoints.down("xs")]:{
      fontSize:"0.75rem",
    }
  },
  itemIcon:{
    marginRight: "6px",
    [theme.breakpoints.down("xs")]:{
      marginRight:"2px",
    }
  }
}));

function ActivityList({ value, toggle, acitvitylist, classname }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={1} className={classname}>
        {acitvitylist.map((item, index) => (
          <Button
            variant="outlined"
            color="primary"
            className={`
                    ${classes.defaultButton}
                    ${
                      value === item.id
                        ? classes.activeButton
                        : classes.inactiveButton
                    }
                `}
            disableRipple
            disableElevation
            onClick={() => toggle(item)}>
            {item.icon && (
              <item.icon
                fontSize="small"
                className={classes.itemIcon}
              />
            )}
            <Typography className={classes.itemText}>{item.text}</Typography>
          </Button>
        ))}
      </Grid>
    </React.Fragment>
  );
}

export default ActivityList;
