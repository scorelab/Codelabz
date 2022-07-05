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
    marginBottom: "2rem",
  },
  chip: {
    margin: "0px 10px 10px 0px",
    borderRadius: "5px",
  },
}));

const TagCard = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testId="TagsCard">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            data-testId="TagsCardTitle"
          >
            Popular Tags
          </Typography>
          {props.tags.map(function (tag, index) {
            return (
              <Chip
                size="small"
                label={tag}
                id={index}
                className={classes.chip}
                data-testId={index == 0 ? "TagsChip" : ""}
              />
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default TagCard;
