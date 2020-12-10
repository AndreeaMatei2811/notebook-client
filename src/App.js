import React, { useEffect, useState } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
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
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import ShowNotebook from "./pages/ShowNotebook/ShowNotebook";
import ShowStudent from "./pages/ShowStudent/ShowStudent";
import Landingpage from "./pages/HomePage/Landingpage";
import { IconButton, MuiThemeProvider, Paper } from "@material-ui/core";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import { createMuiTheme } from "@material-ui/core/styles/";

// import { Switch } from "@material-ui/core/";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

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
      text: {
        secondary: "#3e4e50",
      },
    },
    typography: {
      button: {
        fontFamily: "Source Sans Pro",
      },
      fontFamily: "Source Sans Pro",
      subtitle1: {
        fontFamily: "Architects Daughter",
      },
    },
  });

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <Paper>
        <div className="App">
          <Navigation />
          <IconButton onClick={toggleDarkMode}>
            <Brightness2Icon />
          </IconButton>

          <MessageBox />
          {isLoading ? <Loading /> : null}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/landing" component={Landingpage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/my-notebooks" component={MyNotebooksPage} />
            <Route path="/fellow-students" component={FellowStudents} />

            <Route path="/show-notebook/:notebookId" component={ShowNotebook} />
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
        </div>
      </Paper>
    </MuiThemeProvider>
  );
}

export default App;
