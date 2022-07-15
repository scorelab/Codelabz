import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import TurnedInNotOutlinedIcon from '@material-ui/icons/TurnedInNotOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '45%',
    borderRadius: '10px',
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '99%',
    },
  },
  grow: {
    flexGrow: 1,
  },
  margin: {
    marginRight: '5px',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  inline: {
    fontWeight: 600,
  },
  contentPadding: {
    padding: '0 16px',
  },
  icon: {
    padding: '5px',
  },
  time: {
    lineHeight: '1',
  },
  small: {
    padding: '4px',
  },
}));

export default function CardWithoutPicture(props) {
  const classes = useStyles();
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const [alignment, setAlignment] = React.useState('left');
  const [count, setCount] = useState(1);
  const handleIncrement = () => {
    setCount(count + 1);
  }

  const handleDecrement = () => {
    setCount(count - 1);
  }

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Card className={classes.root}>
      <ThemeProvider theme={theme}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              S
            </Avatar>
          }
          title={
            <React.Fragment>
              <Typography
                component="span"
                variant="h7"
                className={classes.inline}
                color="textPrimary"
              >
                {props.name}
              </Typography>
              {" for "}
              <Typography
                component="span"
                variant="h7"
                className={classes.inline}
                color="textPrimary"
              >
                {props.organizationName}
              </Typography>
            </React.Fragment>
          }
          subheader={props.date}
        />
        <CardContent className={classes.contentPadding} >
          <Typography variant="h5" color="text.primary">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" paragraph>
            {props.contentDescription}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Chip label="HTML" component="a" href="#chip" clickable variant="outlined" className={classes.margin} />
          <Typography variant="overline" display="block" className={classes.time}>
            {props.time}
          </Typography>
          <div className={classes.grow} />
          <ToggleButtonGroup
            size="small"
            className={classes.small}
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton className={classes.small} onClick={handleIncrement} value="left" aria-label="left aligned">
              <KeyboardArrowUpIcon />
              <span>{count}</span>
            </ToggleButton>
            <ToggleButton className={classes.small} onClick={handleDecrement} value="center" aria-label="centered">
              <KeyboardArrowDownIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <IconButton aria-label="share">
            <ChatOutlinedIcon />
          </IconButton>
          <IconButton aria-label="add to favorites">
            <ShareOutlinedIcon />
          </IconButton>
          <IconButton aria-label="share">
            <TurnedInNotOutlinedIcon />
          </IconButton>
          <IconButton aria-label="share">
            <MoreVertOutlinedIcon />
          </IconButton>
        </CardActions>
      </ThemeProvider>
    </Card>
  );
}
