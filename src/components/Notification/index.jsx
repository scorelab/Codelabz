import { Grid, Card } from "@mui/material";
import SideBar from "../SideBar";
import useStyles from "./styles";
import { useState } from "react";
import useWindowSize from "../../helpers/customHooks/useWindowSize";
const Notification = ({ background = "white", textColor = "black" }) => {
  const classes = useStyles();
  const [openMenu, setOpen] = useState(false);
  const toggleSlider = () => {
    setOpen(!openMenu);
  };
  const windowSize = useWindowSize();
  return (
    <>
      <Card
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
            Notifications
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Notification;
