import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import TutorialImg from "../../../../assets/images/tutorialCard.png";
import React from "react";
import { Link } from "react-router-dom";

const TutorialCard = ({
  tutorialData: { tutorial_id, title, summary, icon, owner },
  loading,
}) => {
  return (
    <Card style={{ height: "100%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Tutorial icon"
          height="140"
          image={icon ? icon : TutorialImg}
          title="Tutorial icon"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {title}
          </Typography>
          {loading ? <Skeleton variant="text" /> : null}
          {loading ? <Skeleton variant="text" /> : null}
          {loading ? <Skeleton variant="text" /> : null}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/tutorials/${owner}/${tutorial_id}`}>
          <Button size="small" color="primary">
            View
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default TutorialCard;
