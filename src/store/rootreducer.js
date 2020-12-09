import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import allNotebooksReducer from "./Notebooks/reducer";
import allSubjectsReducer from "../store/subjects/reducer";
import allUsersReducer from "../store/AllUsers/reducer";

export default combineReducers({
  appState,
  user,
  notebooks: allNotebooksReducer,
  subjects: allSubjectsReducer,
  allUsers: allUsersReducer,
});
