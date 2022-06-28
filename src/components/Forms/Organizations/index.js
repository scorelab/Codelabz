import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GoogleImg from "../../../assets/orgs/google.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import useStyles from './styles';

const Organizations = () => {

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box width="220px">
            <Grid container spacing={5} justifyContent="center" alignItems='center' style={{margin:"0"}}>
              <Grid item xs={4} style={{flexBasis: "21%", padding: "10px"}}>
                <img
                src={GoogleImg}
                alt="google"
                // onClick={() => signInWithGoogle()(firebase, dispatch)}
                className={classes.button}
                />
              </Grid>
              <Grid item xs={4} style={{padding:"10px"}}>
                <Typography variant='h6' style={{color:"#0969DA"}}>Google</Typography>
              </Grid>
              <Grid item xs={4} style={{padding:"10px"}}>
                <Typography style={{fontSize: 13, color: "#767676"}}>Owner</Typography>
              </Grid>            
            </Grid>
            <Grid container spacing={5} justifyContent="center" alignItems='center' style={{margin:"0"}}>
              <Grid item xs={4} style={{flexBasis: 0, padding: "10px"}}>
                <GitHubIcon className={classes.git}>
                  <span className="sm-text">Github</span>
                </GitHubIcon>
              </Grid>
              <Grid item xs={4} style={{padding:"10px"}}>
                <Typography variant='h6' style={{color:"#0969DA"}}>Github</Typography>
              </Grid>
              <Grid item xs={4} style={{padding:"10px"}}>
                <Typography style={{fontSize: 13, color: "#767676"}}>Admin</Typography>
              </Grid>             
            </Grid>
            <Grid container spacing={5} justifyContent="center" alignItems='center' style={{margin:"0"}}>
              <Grid item xs={4} style={{flexBasis: 0, padding: "10px"}}>
                <TwitterIcon className={classes.tw}>
                  <span className="sm-text">Twitter</span>
                </TwitterIcon>
              </Grid>
              <Grid item xs={4} style={{padding:"10px"}}>
                <Typography variant='h6' style={{color:"#0969DA"}}>Twitter</Typography>
              </Grid>
              <Grid item xs={4} style={{padding:"10px"}}>
                <Typography style={{fontSize: 13, color: "#767676"}}>Contributor</Typography>
              </Grid>             
            </Grid>
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="space-around" alignItems="center" width="180px" fontFamily="sans-serif">
            <Grid container spacing={5} justifyContent="center" alignItems='center' style={{margin:"0"}}>
              <Grid item xs={4} style={{flexBasis: 0, margin: "0 5px", padding: "10px", backgroundColor: "#F9F9F9", borderRadius: "5px"}}>
                Settings
              </Grid>
              <Grid item xs={4} style={{flexBasis: 0, margin: "0 5px", padding: "10px 15px", backgroundColor: "#F9F9F9", borderRadius: "5px"}}>
                Leave
              </Grid>
            </Grid>
            <Grid container spacing={5} justifyContent="center" alignItems='center' style={{margin:"0"}}>
              <Grid item xs={4} style={{flexBasis: 0, margin: "0 5px", padding: "10px", backgroundColor: "#F9F9F9", borderRadius: "5px"}}>
                Settings
              </Grid>
              <Grid item xs={4} style={{flexBasis: 0, margin: "0 5px", padding: "10px 15px", backgroundColor: "#F9F9F9", borderRadius: "5px"}}>
                Leave
              </Grid>
            </Grid>
            <Grid container spacing={5} justifyContent="center" alignItems='center' style={{margin:"0"}}>
              <Grid item xs={4} style={{flexBasis: 0, margin: "0 5px", padding: "10px", backgroundColor: "#F9F9F9", borderRadius: "5px"}}>
              Settings
              </Grid>
              <Grid item xs={4} style={{flexBasis: 0, margin: "0 5px", padding: "10px 15px", backgroundColor: "#F9F9F9", borderRadius: "5px"}}>
                Leave
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Organizations
