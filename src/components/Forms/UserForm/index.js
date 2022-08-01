import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import {
  alpha,
  styled,
  Card,
  InputBase,
  InputLabel,
  TextField,
  FormControl,
  Typography,
  OutlinedInput,
  Select,
  MenuItem
} from "@material-ui/core";
import useStyles from "./styles";
import data from "./countries.json";

const Input = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3)
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#fff",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow"
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}));

const UserForm = () => {
  const classes = useStyles();

  const [country, setCountry] = useState("");

  const handleChangeCountry = event => {
    setCountry(event.target.value);
  };

  return (
    <Card className={classes.root}>
      <Box
        component="form"
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box>
          <FormControl variant="standard" style={{ marginRight: "25px" }}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "#000", fontSize: "20px" }}
            >
              Name
            </InputLabel>
            <Input
              placeholder="name"
              id="bootstrap-input"
              className={classes.input}
              data-testId="name"
            />
          </FormControl>
          <FormControl variant="standard" className={classes.usernameField}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "#000", fontSize: "20px" }}
            >
              Username
            </InputLabel>
            <Input
              placeholder="@username"
              id="bootstrap-input"
              className={classes.input}
              data-testId="username"
            />
          </FormControl>
        </Box>
        <FormControl variant="standard" style={{ marginTop: "15px" }}>
          <InputLabel
            shrink
            htmlFor="bootstrap-input"
            style={{ color: "#000", fontSize: "20px" }}
          >
            Email (Primary)
          </InputLabel>
          <Input
            placeholder="xyz@gmail.com"
            id="bootstrap-input"
            className={classes.input}
            data-testId="userEmail"
          />
          <Typography
            style={{ color: "#0075AD", marginTop: "10px" }}
            data-testId="userAddAnotherEmail"
          >
            Add another Email address
          </Typography>
        </FormControl>
        <Box variant="standard" style={{ marginTop: "15px" }}>
          <InputLabel
            shrink
            htmlFor="bootstrap-input"
            style={{ color: "#000", fontSize: "20px" }}
          >
            Country of residence
          </InputLabel>
          <FormControl
            data-testId="selectCountry"
            style={{ marginTop: "10px" }}
          >
            <Select
              value={country}
              onChange={handleChangeCountry}
              input={<OutlinedInput style={{ height: 40, width: 250 }} />}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {data.map(country => (
                <MenuItem value={country} data-testId="selectCountryItem">
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Card>
  );
};

export default UserForm;
