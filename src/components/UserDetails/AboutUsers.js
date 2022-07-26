import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider
} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "95%"
    },
    [theme.breakpoints.up("md")]: {
      width: "50%"
    }
  },
  head: {
    fontWeight: "medium",
    marginBottom: "5px"
  }
}));

function AboutUsers({ backgroundColor, Heading, Content, className }) {
  const classes = useStyles();
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <Card className={className ? className : classes.root} variant="outlined">
      <CardContent style={{ backgroundColor: backgroundColor }}>
        <ThemeProvider theme={theme}>
          <Typography className={classes.head} variant="h5" component="h2">
            {Heading}
          </Typography>
          <Typography variant="body2" component="p">
            {Content}
          </Typography>
        </ThemeProvider>
      </CardContent>
    </Card>
  );
}
export default AboutUsers;
