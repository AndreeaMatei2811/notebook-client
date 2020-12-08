import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import allMyNotebooksReducer from "./myNotebooks/reducer";

export default combineReducers({
  appState,
  user,
  myNotebooks: allMyNotebooksReducer,
});
