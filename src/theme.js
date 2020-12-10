import { createMuiTheme } from "@material-ui/core/styles/";

export const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#F5AC72",
    },
    secondary: {
      main: "#facfad",
    },
    text: {
      secondary: "#3e4e50",
    },
  },
  typography: {
    button: {
      fontFamily: "Source Sans Pro",
    },
    fontFamily: "Source Sans Pro",
  },
});
