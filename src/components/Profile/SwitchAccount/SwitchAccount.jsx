import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import NativeSelect from "@mui/material/NativeSelect";
import { Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "95%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      flexDirection: "column"
    }
  },
  formControl: {
    minWidth: 120
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  details: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center"
    }
  },
  divDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  },
  name: {
    width: "60%",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center"
    }
  },
  margin: {
    display: "flex",
    width: "100%",
    marginLeft: "2rem",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px"
    }
  },
  marginR: {
    marginRight: "0px",
    [theme.breakpoints.down("xs")]: {
      marginRight: "0px"
    }
  }
}));

export default function SwitchAccount({
  avatar,
  name,
  userOrgs,
  buttonClick,
  buttonText
}) {
  //Getting the details of all organizations submitted by current User
  const organizations = useSelector(
    ({
      profile: {
        data: { organizations }
      }
    }) => organizations
  );
  //This will be used to move on the organization page based upon the selection in dropdown
  let history = useHistory();

  const classes = useStyles();
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const [organisation, setOrganisation] = useState("");

  const handleChange = event => {
    const name = event.target.name;
    setOrganisation(event.target.value);
    //This will take you to the selected organiztion home page
    history.push(`/org/${event.target.value}`);
  };

  return (
    <Card
      className={classes.root}
      elevation={0}
      data-test-id="switch-account-card"
    >
      <CardContent className={classes.details}>
        <ThemeProvider theme={theme}>
          <div className={classes.margin}>
            <div
              style={{
                marginLeft: "30px",
                marginTop: "10px",
                marginBottom: "5px"
              }}
            >
              <Grid item container xs={3} justifyContent="center">
                {avatar.type === "char" ? (
                  <Avatar className={classes.large}>{avatar.value}</Avatar>
                ) : (
                  <Avatar className={classes.large} src={avatar.value} />
                )}
              </Grid>
            </div>

            <div style={{ width: "60%" }}>
              <Typography className={classes.name} variant="h5">
                <b>{name}</b>
              </Typography>
              <div className={classes.divDetails}>
                <Typography variant="subtitle2">Personal account</Typography>
                <IconButton aria-label="share">
                  <SwapHorizIcon />
                </IconButton>

                <div>
                  <FormControl className={classes.formControl}>
                    <NativeSelect
                      className={classes.selectEmpty}
                      value={organisation}
                      name="organisation"
                      onChange={handleChange}
                      inputProps={{ "aria-label": "Organizations" }}
                    >
                      {/* dropdown options for switching organisations */}
                      <option value="">Organisations</option>
                      {userOrgs.map(org => (
                        <option value={org}>{org}</option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </CardContent>
      {buttonText && (
        <Button
          className={classes.marginR}
          variant="outlined"
          onClick={buttonClick || (() => {})}
          style={{ marginRight: "10px" }}
        >
          {buttonText}
        </Button>
      )}
    </Card>
  );
}
