import React,{useState} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Grid } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  makeStyles
} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "80%",
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
    [theme.breakpoints.down("xs")]: {
      textAlign: "center"
    }
  },
  margin: {
    marginLeft: "15px",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px"
    }
  },
  marginR: {
    marginRight: "20px",
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
    console.log("Event target is", name, event.target.value);
    setOrganisation(event.target.value)
    //This will take you to the selected organiztion home page
    history.push(`/org/${ event.target.value}`);
  };

  return (
    <Card
      className={classes.root}
      elevation={0}
      data-test-id="switch-account-card"
    >
      <CardContent className={classes.details}>
        <ThemeProvider theme={theme}>
          <Grid item container xs={1} justifyContent="center">
            {avatar.type === "char" ? (
              <Avatar className={classes.large}>{avatar.value}</Avatar>
            ) : (
              <Avatar className={classes.large} src={avatar.value} />
            )}
          </Grid>
          <div className={classes.margin}>
            <Typography className={classes.name} variant="h5">
              {name}
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
          inputProps={{ 'aria-label': 'Organizations' }}
        
        >

          {/* dropdown options for switching organisations */}
           <option value="">Organisations</option>
           {
            userOrgs.map((org)=>(
             <option value={org}>{org}</option>
            ))
           }
        </NativeSelect>
      </FormControl>
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
        >
          {buttonText}
        </Button>
      )}
    </Card>
  );
}
