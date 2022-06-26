import React from "react";
import useStyles from "./styles";
import {
  Box,
  Card,
  InputBase,
  Typography,
  Button,
  alpha,
  styled,
  Switch,
} from "@material-ui/core";

const Input = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#F9F9F9",
    border: "1px solid #ced4da",
    borderRadius: 6,
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const UserPassword = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Box
        component="form"
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box style={{ marginBottom: "5px" }}>
          <Typography className={classes.text}>Old password</Typography>
          <Input type="password" className={classes.input} />
        </Box>
        <Box style={{ margin: "5px 0" }}>
          <Typography className={classes.text}>New password</Typography>
          <Input type="password" className={classes.input} />
        </Box>
        <Box style={{ margin: "5px 0" }}>
          <Typography className={classes.text}>Confirm new password</Typography>
          <Input type="password" className={classes.input} />
        </Box>
        <Button className={classes.button}>Update Password</Button>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography className={classes.text}>Logout</Typography>
          <Typography
            className={classes.text}
            style={{ marginRight: 40, color: "#0075AD" }}
          >
            Logout of all other browsers
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography className={classes.text}>Login security</Typography>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography className={classes.text}>
              Require email verification
            </Typography>
            <Switch color="primary" />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default UserPassword;
