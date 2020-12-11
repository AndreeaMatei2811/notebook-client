import React, { useEffect } from "react";
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

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const userWithToken = useSelector(selectToken);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Nav />
      {/* <Navigation /> */}
      <MessageBox />
      {!userWithToken ? <Redirect to="/" /> : null}
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/my-notebooks" component={MyNotebooksPage} />
        <Route path="/fellow-students" component={FellowStudents} />
        <Route path="/show-notebook/:notebookId" component={ShowNotebook} />
        <Route path="/notebook/student/:studentId" component={ShowStudent} />
        <Route
          path="/notebook/:notebookId/textnotes"
          component={TextNotesPage}
        />
        <Route path="/my-profile" component={UserProfilePage} />
      </Switch>
    </div>
  );
}

export default App;
