import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const basicTheme = responsiveFontSizes(
  createTheme({
    shadows: ["none"],
    palette: {
      primary: {
        main: "#455a64"
      }
    }
  })
);

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#03AAFA"
      }
    }
  })
);
