import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    },
    marginBottom: "2rem",
    width: "100%",
    flex: 1
  },
  logo: {
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    marginRight: "10px"
  },

  card: {
    display: "flex",
    width: "100%"
  }
}));

const EventsCard = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card
        className={(classes.card, classes.root)}
        data-testId="upcomingEventCard"
      >
        <CardContent
          style={{
            width: "100%"
          }}
        >
          <Typography variant="h5" component="div" gutterBottom>
            {props.title}
          </Typography>
          {props.events.map(function (event, index) {
            return (
              <Grid
                container
                direction="row"
                spacing={2}
                data-testId={index == 0 ? "upEventBox" : ""}
              >
                <Grid item xs={3}>
                  <img
                    src={event.img[0]}
                    className={classes.logo}
                    data-testId={index == 0 ? "upEventImg" : ""}
                  />
                </Grid>

                <Grid item xs={9}>
                  <Box data-testId={index == 0 ? "upEventName" : ""}>
                    <Typography>{event.name}</Typography>
                  </Box>
                  <Box
                    sx={{ fontWeight: 400, fontSize: "0.8rem" }}
                    data-testId={index == 0 ? "upEventDate" : ""}
                  >
                    <Typography>{event.date}</Typography>
                  </Box>
                </Grid>
              </Grid>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsCard;
