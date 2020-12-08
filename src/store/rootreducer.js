import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import allNotebooksReducer from "./myNotebooks/reducer";
import allSubjectsReducer from "../store/subjects/reducer";

export default combineReducers({
  appState,
  user,
  notebooks: allNotebooksReducer,
  subjects: allSubjectsReducer,
});
