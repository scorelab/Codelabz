import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '320px',
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '95%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '35%',
    },
    [theme.breakpoints.up('md')]: {
      width: '30%',
    },
  },
  info: {
    display: 'block',
  },
  head: {
    fontWeight: 'medium',
    marginBottom: '5px',
  },
}));

function Highlights(props) {
  const classes = useStyles();
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent style={{ backgroundColor: props.backgroundColor }}>
        <ThemeProvider theme={theme}>
          <Typography className={classes.head} variant="h5" component="h2" data-testId="HighlightsHeading">
            {props.Heading}
          </Typography>
          <Typography variant="body2" component="p" data-testId="HighlightsCurrentJob">
            {props.CurrentJob}
          </Typography>
          <Typography variant="body2" component="p" data-testId="HighlightsEducation">
            {props.Education}
          </Typography>
          <Typography variant="body2" component="p" data-testId="HighlightsLanguages">
            {props.Languages}
          </Typography>
          <Typography variant="body2" component="p" data-testId="HighlightsJoinedDate">
            {props.JoinedDate}
          </Typography>
        </ThemeProvider>
      </CardContent>
    </Card>
  );
}
export default Highlights;