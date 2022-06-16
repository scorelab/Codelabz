import { createMuiTheme, createTheme } from "@material-ui/core/styles";

export const basicTheme = createMuiTheme({
  shadows: ["none"],
  palette: {
    primary: {
      main: "#455a64",
    },
  },
});

export const theme = createTheme({
  palette: {
    primary: {
      main: "#03AAFA",
    },
  },
});
