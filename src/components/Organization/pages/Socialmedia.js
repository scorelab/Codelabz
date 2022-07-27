import { Grid, makeStyles,Button, Typography } from "@material-ui/core";
import React from "react";
import OrganizationSocials from "../OrganizationSocials";


const useStyles = makeStyles((theme) => ({
    root: {
      padding: 20,
    },
    heading: {
      fontWeight: 100,
      fontSize: "1.6rem",
    },
  }));
function Socialmedia() {

    const classes = useStyles();
    return (
        
        <React.Fragment>
            <Grid item spacing={3}>
                <Typography className={classes.heading}>Social Media</Typography>
                <OrganizationSocials/>
            </Grid>
        </React.Fragment>
    );
}
export default Socialmedia;