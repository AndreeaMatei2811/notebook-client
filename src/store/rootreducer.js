import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import allNotebooksReducer from "./myNotebooks/reducer";

export default combineReducers({
  appState,
  user,
  notebooks: allNotebooksReducer,
});
