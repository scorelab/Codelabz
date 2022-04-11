import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import TutorialImg from "../../../../assets/images/tutorialCard.png";
import React from "react";
import { Link } from "react-router-dom";

const TutorialCard = ({ tutorialData: { tutorial_id, title, summary, icon, owner }, loading }) => {
  return (
    <Card style={{ height: "100%" }} data-testid="tutorialCard">
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
      <Box display="flex" alignItems="flex-end" p={1} m={1} bgcolor="background.paper" sx={{ height: 100 }}>
        <Box p={1} bgcolor="grey.300">
          <CardActions>
            <Link to={`/tutorials/${owner}/${tutorial_id}`}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                style={{ backgroundColor: "royalblue", margin: "8px" }}
              >
                View
              </Button>
            </Link>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
};

export default TutorialCard;
