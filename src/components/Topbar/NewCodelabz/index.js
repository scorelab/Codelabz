import {
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(40),
    height: theme.spacing(8),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer',
    '&:hover': {},
  },
  iconDiv: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  title: {
    fontWeight: 'normal',
    fontSize: theme.spacing(2),
  },
  description: {
    fontSize: theme.spacing(1.5),
  },
}));

function NewCodelabz() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={0}>
        <Grid
          container
          spacing={0}
          justifyContent='flex-start'
          alignItems='center'
        >
          <Grid
            item
            container
            sm={2}
            className={classes.iconDiv}
            justifyContent='center'
            alignContent='center'
          >
            <AddBoxRoundedIcon color='primary' fontSize='large' />
          </Grid>
          <Grid item container sm={9} direction='column'>
            <Typography variant='h6' className={classes.title}>
              New Codelabz
            </Typography>
            <Typography variant='body2' className={classes.description}>
              Share a tutorial
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}

export default NewCodelabz;
