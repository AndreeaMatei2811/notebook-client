import React, { useEffect, useState } from "react";
import "./App.scss";

import { Switch, Route, Redirect } from "react-router-dom";

import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage/HomePage";
import MyNotebooksPage from "./pages/MyNotebooksPage/MyNotebooksPage";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import FellowStudents from "./pages/FellowStudents/FellowStudents";
import TextNotesPage from "./pages/NotebookPage/TextNotesPage";

import Nav from "./components/Nav";

import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import ShowNotebook from "./pages/ShowNotebook/ShowNotebook";
import ShowStudent from "./pages/ShowStudent/ShowStudent";

import { selectToken } from "./store/user/selectors";

import Landingpage from "./pages/HomePage/Landingpage";
import { Grid, IconButton, MuiThemeProvider, Paper } from "@material-ui/core";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import { createMuiTheme } from "@material-ui/core/styles/";

// import { Switch } from "@material-ui/core/";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const userWithToken = useSelector(selectToken);

  // console.log("is darkmode yes or no", darkMode);
  const toggleDarkMode = (event) => {
    setDarkMode(!darkMode);
  };

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#F5AC72",
      },
      secondary: {
        main: "#facfad",
      },
    },
    typography: {
      button: {
        fontFamily: "Source Sans Pro",
      },
      fontFamily: "Source Sans Pro",
      h1: {
        fontFamily: "Merriweather",
      },
      subtitle1: {
        fontFamily: "Merriweather",
      },
    },
  });

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <Paper style={{ minHeight: "100vh" }}>
        <Grid container>
          <Grid item sm={12}>
            <Nav />
          </Grid>
          <Grid item sm={11}></Grid>
          <Grid item sm={1}>
            <IconButton onClick={toggleDarkMode}>
              <Brightness2Icon />
            </IconButton>
          </Grid>
          <Grid item sm={12}>
            <MessageBox />
            {!userWithToken ? <Redirect to="/" /> : null}
            {isLoading ? <Loading /> : null}
          </Grid>
          <Grid item sm={12}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/landing" component={Landingpage} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/my-notebooks" component={MyNotebooksPage} />
              <Route path="/fellow-students" component={FellowStudents} />
              <Route
                path="/show-notebook/:notebookId"
                component={ShowNotebook}
              />
              <Route
                path="/notebook/student/:studentId"
                component={ShowStudent}
              />
              <Route
                path="/notebook/:notebookId/textnotes"
                component={TextNotesPage}
              />
              <Route path="/my-profile" component={UserProfilePage} />
            </Switch>
          </Grid>
        </Grid>
      </Paper>
    </MuiThemeProvider>
  );
}

export default App;
