import {
  Avatar,
  Button,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px",
  },
  gridPadding: {
    padding: theme.spacing(2),
  },
  button: {
    boxShadow: "none",
    borderRadius: "10px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightMedium,
  },
  body: {
    fontSize: theme.typography.pxToRem(12),
  },
  userCard: {
    padding: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
    borderRadius: "10px",
  },
  userList: {
    marginTop: theme.spacing(2),
  },
  userName: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightMedium,
  },
  userDesignation: {
    fontSize: theme.typography.pxToRem(14),
    paddingLeft: theme.spacing(0.5),
    fontWeight: theme.typography.fontWeightLight,
  },
  viewMore: {
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    cursor: "pointer",
  },
  buttonDiv: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-start',
      paddingTop: theme.spacing(2)
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end'
    }
  }
}));

function Orgusers({
  Users,
  title,
  description,
  AddUser,
  isViewMore,
  dataTestId,
}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper elevation={0} className={classes.root} data-testid={dataTestId}>
        <Grid container className={classes.gridPadding}>
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
            <Grid item container md={2}
              className={classes.buttonDiv}
            >
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                style={{
                  display: AddUser ? "flex" : "none",
                }}
              >
                <AddIcon />
                Add New
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            className={classes.userList}
            data-testid="org-userlist"
          >
            {Users.map((user, index) => (
              <React.Fragment key={index}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  className={classes.userCard}
                  data-testid="org-user-card"
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
                      {user.name},
                    </Typography>
                    <Typography className={classes.userDesignation}>
                      {user.designation}
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
            display: isViewMore ? "flex" : "none",
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
