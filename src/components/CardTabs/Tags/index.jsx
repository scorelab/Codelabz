import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    },
    marginBottom: "2rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(0),
      margin: "0.25rem"
    }
  },
  tagsContainer: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "90vw",
      display: "flex",
      whiteSpace: "nowrap",
      overflow: "auto",
      "&::-webkit-scrollbar": {
        height: "5px"
      }
    }
  },
  chip: {
    margin: "0px 10px 10px 0px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#03aafa",
      color: "#ffff"
    }
  }
}));

const TagCard = props => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testId="TagsCard">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            data-testId="TagsCardTitle"
          >
            Popular Tags
          </Typography>
          <div className={classes.tagsContainer}>
            {props.tags.map(function (tag, index) {
              return (
                <Chip
                  key={index}
                  size="small"
                  label={tag}
                  id={index}
                  className={classes.chip}
                  data-testId={index === 0 ? "TagsChip" : ""}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TagCard;
