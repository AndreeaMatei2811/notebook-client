import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../user/selectors";
import {
  appLoading,
  appDoneLoading,
  //   showMessageWithTimeout,
} from "../appState/actions";

export function allNotebooksFetched(allNotebooks) {
  return {
    type: "allNotebooksFetched",
    payload: allNotebooks,
  };
}

export function fetchAllNotebooks() {
  return async function thunk(dispatch, getState) {
    dispatch(appLoading());
    const { token } = selectUser(getState());
    const res = await axios.get(`${apiUrl}/notebooks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const allNotebooks = res.data;

    dispatch(allNotebooksFetched(allNotebooks));
    dispatch(appDoneLoading());
  };
}

export function addANote(notebookId, title, content) {
  return {
    type: "ADD_A_NOTE",
    payload: { notebookId, title, content },
  };
}

export function addNoteToNotebook(notebookId, title, content) {
  console.log("did i get to addnotetonotebook");
  return async function thunk(dispatch, getState) {
    try {
      const res = await axios.post(`${apiUrl}/notebooks/${notebookId}/notes`, {
        notebookId,
        title,
        content,
        typeOfNote: "textnote",
        imageUrl: "",
      });
      console.log("response", res);
      dispatch(addANote(notebookId, title, content));
    } catch (error) {
      console.error(error);
    }
  };
}
