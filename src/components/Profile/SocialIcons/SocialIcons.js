import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '300px',
        margin: 'auto',
    },
    icon: {
        justifyContent: 'space-around',
    },
}));

export default function SocialIcons(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActions className={classes.icon} disableSpacing>
                <IconButton color="primary" aria-label="share">
                    <FacebookIcon />
                </IconButton>
                <IconButton color="primary" aria-label="share">
                    <LinkedInIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <GitHubIcon />
                </IconButton>
                <IconButton color="primary" aria-label="add to favorites">
                    <TwitterIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <LinkIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
