import React, { useEffect } from "react";
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
import NotebookPage from "./pages/NotebookPage/NotebookPage";
import AddNotePage from "./pages/NotebookPage/AddNotePage";
import TextNotesPage from "./pages/NotebookPage/TextNotesPage";
import SnippetNotesPage from "./pages/NotebookPage/SnippetNotesPage";
import DefinitionNotesPage from "./pages/NotebookPage/DefinitionNotesPage";
import ImageNotesPage from "./pages/NotebookPage/ImageNotesPage";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/my-notebooks" component={MyNotebooksPage} />
        <Route path="/fellow-students" component={FellowStudents} />
        {/* <Route path="/notebook/:notebookId" component={NotebookPage} /> */}
        <Route path="/notebook/:notebookId/add" component={AddNotePage} />
        <Route
          path="/notebook/:notebookId/textnotes"
          component={TextNotesPage}
        />
        <Route
          path="/notebook/:notebookId/snippets"
          component={SnippetNotesPage}
        />
        <Route
          path="/notebook/:notebookId/definitions"
          component={DefinitionNotesPage}
        />
        <Route path="/notebook/:notebookId/images" component={ImageNotesPage} />
      </Switch>
    </div>
  );
}

export default App;
