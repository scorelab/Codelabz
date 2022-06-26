import React from "react";
import Box from "@material-ui/core/Box";
import { alpha, styled } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import useStyles from "./styles";

const Input = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#fff",
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

const UserEmail = () => {
  const classes = useStyles();

  const [email1, setEmail1] = React.useState("");
  const [email2, setEmail2] = React.useState("");

  const handleChange1 = (event) => {
    setEmail1(event.target.value);
  };

  const handleChange2 = (event) => {
    setEmail2(event.target.value);
  };

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
        <Typography style={{ margin: "5px 0" }}>
          thisismyemail@gmail.com -{" "}
          <Typography variant="span" style={{ color: "#039500" }}>
            Primary
          </Typography>
        </Typography>
        <Box>
          <Typography style={{ margin: "5px 0" }}>Add email address</Typography>
          <Box
            style={{ display: "flex", alignItems: "center", margin: "10px 0" }}
          >
            <Input
              placeholder="thisismyemail@gmail.com"
              className={classes.input}
            />
            <Typography>Add</Typography>
          </Box>
        </Box>
        <Box className={classes.email}>
          <Typography className={classes.text} style={{ marginRight: 30 }}>
            Primary email address
          </Typography>
          <FormControl>
            <Select
              value={email1}
              onChange={handleChange1}
              input={<OutlinedInput style={{ height: 40, width: 250 }} />}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <Typography>thisismyemail@gmail.com</Typography>
              </MenuItem>
              <MenuItem value={"email1@gmail.com"}>email1@gmail.com</MenuItem>
              <MenuItem value={"email2@gmail.com"}>email2@gmail.com</MenuItem>
              <MenuItem value={"email3@gmail.com"}>email3@gmail.com</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className={classes.email}>
          <Typography className={classes.text} style={{ marginRight: 30 }}>
            Backup email address
          </Typography>
          {/* <Input type="password" className={classes.input} /> */}
          <FormControl>
            <Select
              value={email2}
              onChange={handleChange2}
              input={<OutlinedInput style={{ height: 40, width: 250 }} />}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <Typography>thisismyemail@gmail.com</Typography>
              </MenuItem>
              <MenuItem value={"email1@gmail.com"}>email1@gmail.com</MenuItem>
              <MenuItem value={"email2@gmail.com"}>email2@gmail.com</MenuItem>
              <MenuItem value={"email3@gmail.com"}>email3@gmail.com</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Card>
  );
};

export default UserEmail;
