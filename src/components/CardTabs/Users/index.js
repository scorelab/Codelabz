import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddUser from "../../../assets/images/add-user.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
    flex: 1,
    marginBottom: "2rem",
  },
  userImg: {
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    marginRight: "10px",
  },

  card: {
    display: "flex",
    minWidth: "100%",
    width: "100%",
  },

  cardContent: {
    width: "100%",
  },
}));

const UserCard = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testId="UsersCard">
      <Card sx={{ minWidth: 275 }} className={(classes.card, classes.root)}>
        <CardContent className={classes.cardContent}>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            data-testId="UsersCardTitle"
          >
            {props.title}
          </Typography>
          {props.users.map(function (user, index) {
            return (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  key: "user" + { index },
                  mb: 1.5,
                }}
                gutterBottom
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    cursor:"pointer",
                  }}
                >
                  <img
                    src={user.img[0]}
                    className={classes.userImg}
                    data-testId={index == 0 ? "UsersCardImg" : ""}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{ fontWeight: 600, fontSize: "1rem" }}
                      data-testId={index == 0 ? "UserName" : ""}
                    >
                      {user.name}
                    </Box>
                    <Box
                      sx={{ fontWeight: 400, fontSize: "0.8rem" }}
                      data-testId={index == 0 ? "UserDesg" : ""}
                    >
                      {user.desg}
                    </Box>
                  </Box>
                </Box>
                <Box
                  onClick={() => user.onClick}
                  data-testId={index == 0 ? "UserAdd" : ""}
                >
                  <img src={AddUser} />
                </Box>
              </Box>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserCard;
