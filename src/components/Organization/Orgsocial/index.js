import { Grid, makeStyles,Button, Typography } from "@material-ui/core";
import React from "react";
import GoogleImg from "../../../assets/orgs/google.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";


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
        marginTop:"20px"
    },
    contain: {
        padding: 20,
        [theme.breakpoints.down('md')]: {
          width: '80%',
        },
        [theme.breakpoints.down('xs')]: {
          width: '99%',
        },
    },
    heading: {
      fontWeight: 100,
      fontSize: "1.6rem",
    },
    Button: {
        boxShadow: "none",
        borderRadius: "25px",
        border: 0,
        backgroundColor: theme.palette.grey[200],
        padding: 20,
    }
  }));
function Orgsocial() {

    const classes = useStyles();
    return (
        <React.Fragment>
        <Grid container className={classes.root} direction="row" spacing={2}>
            <Grid item >
                <Button variant="contained" startIcon={<FacebookIcon/>} direction="column" spacing={3} >
                    Organization FaceBook profile  
                </Button>
            </Grid>
            <Grid item >
                <Button variant="contained" startIcon={<GitHubIcon/>} direction="column" spacing={3}  >
                    Organization Github profile
                </Button>
                </Grid>
                <Grid container className={classes.contain} direction="row" spacing={2}>
                <Grid item>
                    <Button variant="contained" startIcon={<img src={GoogleImg} width={20} height={20} alt="google" className={classes.button} />}>
                        Organization Google profile   
                    </Button>
                </Grid>
                <Grid item >
                    <Button variant="contained" startIcon={<TwitterIcon/>}>
                        Organization Twitter profile
                    </Button>
                    </Grid>
                    </Grid>
            </Grid>
        </React.Fragment>
    );
}
export default Orgsocial;