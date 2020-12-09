import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectToken, selectUser } from "../user/selectors";
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

const addANote = (notebookId, title, content) => {
  return {
    type: "ADD_A_NOTE",
    payload: { notebookId, title, content },
  };
};

export function addNoteToNotebook(notebookId, title, content, raw) {
  return async function thunk(dispatch, getState) {
    dispatch(appLoading());
    const token = selectToken(getState());

    try {
      const res = await axios.post(
        `${apiUrl}/notebooks/${notebookId}/notes`,
        {
          notebookId,
          title,
          content,
          typeOfNote: "textnote",
          imageUrl: "",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response", res);
      dispatch(addANote(notebookId, title, content));
      dispatch(appDoneLoading());
    } catch (error) {
      console.error(error);
      dispatch(appDoneLoading());
    }
    dispatch(appDoneLoading());
  };
}

const selectNotebook = (notebook) => {
  return {
    type: "SELECT_NOTEBOOK",
    payload: notebook,
  };
};

export function fetchSelectedNotebook(notebookId) {
  return async function thunk(dispatch, getState) {
    dispatch(appLoading());

    try {
      const res = await axios.get(`${apiUrl}/notebooks/${notebookId}`);

      dispatch(selectNotebook(res.data));
      dispatch(appDoneLoading());
    } catch (error) {
      console.error(error);
      dispatch(appDoneLoading());
    }
  };
}
