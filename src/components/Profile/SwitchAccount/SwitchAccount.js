import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Grid } from '@material-ui/core';
import { createTheme, responsiveFontSizes, ThemeProvider, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            width: '95%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '95%',
            flexDirection: 'column',
        },
    },
    formControl: {
        minWidth: 120,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    divDetails: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    name: {
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
        },
    },
    margin: {
        marginLeft: '15px',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0px',
        },
    },
    marginR: {
        marginRight: '20px',
        [theme.breakpoints.down('xs')]: {
            marginRight: '0px',
        },
    },
}));

export default function SwitchAccount(props) {
    const classes = useStyles();
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    const [state, setState] = React.useState({
        email: '',
        name: '',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <Card className={classes.root}>
            <CardContent className={classes.details}>
                <ThemeProvider theme={theme}>
                    <Grid
                        item
                        container
                        xs={1}
                        justifyContent="center"
                    >
                        {props.avatar.type === "char" ? (
                            <Avatar className={classes.large}>{props.avatar.value}</Avatar>
                        ) : (
                            <Avatar className={classes.large} src={props.avatar.value} />
                        )}
                    </Grid>
                    <div className={classes.margin}>
                        <Typography className={classes.name} variant="h5" data-testId="AccountUserName">
                            {props.name}
                        </Typography>
                        <div className={classes.divDetails}>
                            <Typography variant="subtitle2" data-testId="AccountType">
                                Personal account
                            </Typography>
                            <IconButton aria-label="share" data-testId="AccountSwapIcon">
                                <SwapHorizIcon />
                            </IconButton>
                            <FormControl className={classes.formControl} data-testId="AccountSwap">
                                <NativeSelect
                                    className={classes.selectEmpty}
                                    value={state.age}
                                    name="age"
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'age' }}
                                >
                                    <option value="" disabled color='primary'>
                                        Switch to another account
                                    </option>
                                    <option value={10}>{props.secondaryMail}</option>
                                </NativeSelect>
                            </FormControl>
                        </div>
                    </div>
                </ThemeProvider>
            </CardContent>
            <Button className={classes.marginR} variant="outlined" data-testId="PersonalProfileButton">Go to your personal profile</Button>
        </Card>
    );
}
