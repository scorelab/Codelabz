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
import data from "./temp.json";

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

  const [primaryEmail, setPrimaryEmail] = React.useState(data.primaryEmail);
  const [backupEmail, setBackupEmail] = React.useState(data.backupEmail);

  const handleChangePrimary = (event) => {
    setPrimaryEmail(event.target.value);
  };

  const handleChangeBackup = (event) => {
    setBackupEmail(event.target.value);
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
          {data.primaryEmail} -{" "}
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
              value={primaryEmail}
              onChange={handleChangePrimary}
              input={<OutlinedInput style={{ height: 40, width: 250 }} />}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {data.primaryEmailOptions.map(email => <MenuItem value={email}>{email}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <Box className={classes.email}>
          <Typography className={classes.text} style={{ marginRight: 30 }}>
            Backup email address
          </Typography>
          <FormControl>
            <Select
              value={backupEmail}
              onChange={handleChangeBackup}
              input={<OutlinedInput style={{ height: 40, width: 250 }} />}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {data.backupEmailOptions.map(email => <MenuItem value={email}>{email}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Card>
  );
};

export default UserEmail;
