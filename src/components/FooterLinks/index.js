import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(0.5),
        },
        marginBottom: "1rem",
        border: "none",
        backgroundColor: "transparent",
        boxShadow:"none"
    },
    chip: {
        margin: "0px 10px 10px 0px",
        backgroundColor: "transparent",
        border: "none",
        cursor:"pointer"
    },
}));

const FooterLinks = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}><CardContent>
                    {props.elements.map(function (el, index) {
                        return (
                            <a href={el.link}>
                            <Chip
                                size="small"
                                label={el.name}
                                id={index}
                                className={classes.chip}
                                />
                            </a>
                        );
                    })}
                </CardContent>
            </Card>
    );
};

export default FooterLinks;