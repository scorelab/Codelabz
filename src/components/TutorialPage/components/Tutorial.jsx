import React, { useEffect, useRef } from "react";
import { Card, Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    padding: "5px 24px",
    margin: "24px 0"
  }
}));

const Tutorial = ({ steps }) => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.container}>
        {steps?.map((step, i) => {
          return (
            <Box id={step.id} key={step.id}>
              <Typography sx={{ fontWeight: "600" }}>
                {i + 1 + ". " + step.title}
              </Typography>
              <Typography
                className="content"
                dangerouslySetInnerHTML={{ __html: step.content }}
              ></Typography>
            </Box>
          );
        })}
      </Card>
    </>
  );
};

export default Tutorial;
