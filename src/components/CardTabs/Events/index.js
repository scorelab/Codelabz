import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    },
    marginBottom: "2rem",
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
        sx={{ minWidth: 275 }}
        className={(classes.card, classes.root)}
        data-testId="upcomingEventCard"
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {props.title}
          </Typography>
          {props.events.map(function (event, index) {
            return (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  key: "up" + { index },
                  mb: 1.5,
                  cursor: "pointer"
                }}
                gutterBottom
                data-testId={index == 0 ? "upEventBox" : ""}
              >
                <img
                  src={event.img[0]}
                  className={classes.logo}
                  data-testId={index == 0 ? "upEventImg" : ""}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{ fontWeight: 400, fontSize: "0.8rem" }}
                    data-testId={index == 0 ? "upEventDate" : ""}
                  >
                    {event.date}
                  </Box>
                  <Box
                    sx={{ fontWeight: 600, fontSize: "1rem" }}
                    data-testId={index == 0 ? "upEventName" : ""}
                  >
                    {event.name}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsCard;
