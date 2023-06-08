import { Grid, Card } from "@mui/material";
import SideBar from "../SideBar";
import useStyles from "./styles";
import { useState } from "react";
import { userList } from "./userList";
import useWindowSize from "../../helpers/customHooks/useWindowSize";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CardWithoutPicture from "../Card/CardWithoutPicture";
const Notification = ({ background = "white", textColor = "black" }) => {
  const classes = useStyles();
  const [openMenu, setOpen] = useState(false);
  const toggleSlider = () => {
    setOpen(!openMenu);
  };
  const windowSize = useWindowSize();
  return (
    <>
      <section
        className={classes.wrapper}
        style={{ background: background }}
        data-testId="homepage"
      >
        <Grid className={classes.contentPart}>
          <div className={classes.sideBody}>
            {windowSize.width > 750 && (
              <Grid
                item
                container
                className={classes.leftSideCard}
                direction="column"
                style={{
                  width: "100%",
                  overflow: "auto",
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none"
                }}
              >
                <Grid item className={classes.outerSideBar}>
                  <SideBar open={openMenu} toggleSlider={toggleSlider} />
                </Grid>
              </Grid>
            )}
          </div>
          <Grid
            item
            className={classes.mainBody}
            data-testId="noitificationMainBody"
            xs={10}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "1.5rem",
                marginBottom: "24px"
              }}
            >
              Notifications
            </Typography>
            <div className={classes.container}>
              <Card className={classes.Notification}>
                <Avatar
                  aria-label="recipe"
                  className={classes.avatar}
                  data-testId="UserAvatar"
                  sx={{
                    width: "60px",
                    height: "60px"
                  }}
                >
                  S
                </Avatar>
                <Box>
                  <Typography>
                    <span style={{ fontWeight: "600" }}>Abhishek</span> from{" "}
                    <span style={{ fontWeight: "600" }}>Codelabz</span>
                  </Typography>
                  <Typography className={classes.time}>10 min ago</Typography>
                  <Typography>
                    Posted new Tutorial “5 best Practices to build responsive
                    web apps” : Learn the best practices followed in the
                    industry in this tutorial.
                  </Typography>
                </Box>
              </Card>
              <Card className={classes.Notification}>
                <Avatar
                  aria-label="recipe"
                  className={classes.avatar}
                  data-testId="UserAvatar"
                  sx={{
                    width: "60px",
                    height: "60px"
                  }}
                >
                  S
                </Avatar>
                <Box>
                  <Typography>
                    <span style={{ fontWeight: "600" }}>Abhishek</span> from{" "}
                    <span style={{ fontWeight: "600" }}>Codelabz</span>
                  </Typography>
                  <Typography className={classes.time}>10 min ago</Typography>
                  <Typography>
                    Posted new Tutorial “5 best Practices to build responsive
                    web apps” : Learn the best practices followed in the
                    industry in this tutorial.
                  </Typography>
                </Box>
              </Card>
              <Card className={classes.Notification}>
                <Avatar
                  aria-label="recipe"
                  className={classes.avatar}
                  data-testId="UserAvatar"
                  sx={{
                    width: "60px",
                    height: "60px"
                  }}
                >
                  S
                </Avatar>
                <Box>
                  <Typography>
                    <span style={{ fontWeight: "600" }}>Abhishek</span> from{" "}
                    <span style={{ fontWeight: "600" }}>Codelabz</span>
                  </Typography>
                  <Typography className={classes.time}>10 min ago</Typography>
                  <Typography>
                    Posted new Tutorial “5 best Practices to build responsive
                    web apps” : Learn the best practices followed in the
                    industry in this tutorial.
                  </Typography>
                </Box>
              </Card>
            </div>
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Notification;
