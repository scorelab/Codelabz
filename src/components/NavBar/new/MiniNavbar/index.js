import {
  Button,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
} from '@material-ui/core';
import React from 'react';
import Headroom from 'react-headroom';
import BrandName from '../../../../helpers/brandName';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  root: {
    backgroundColor: theme.palette.grey[100],
    padding: '2px',
    border: '1px solid #ced4da',
  },
  icon: {
    padding: '1px',
  },
  grid: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    borderRadius: '10px',
  },
}));

function MiniNavbar() {
  const classes = useStyles();
  return (
    <Headroom>
      <nav>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item>
            <BrandName />
          </Grid>
          <Grid item>
            <Paper component={'form'} className={classes.root} elevation={0}>
              <IconButton
                type='submit'
                aria-label='search'
                disableRipple
                className={classes.icon}
              >
                <SearchIcon />
              </IconButton>
              <InputBase className={classes.input} placeholder='Search' />
            </Paper>
          </Grid>
          <Grid item className={classes.grid}>
            <Button
              variant='contained'
              color='primary'
              style={{
                boxShadow: 'none',
                color: 'white',
              }}
              className={classes.button}
            >
              Login
            </Button>
            <Button
              variant='outlined'
              color='primary'
              style={{
                boxShadow: 'none',
              }}
              className={classes.button}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </nav>
    </Headroom>
  );
}

export default MiniNavbar;
