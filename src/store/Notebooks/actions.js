import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectToken, selectUser } from "../user/selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setRedirect,
  //   showMessageWithTimeout,
} from "../appState/actions";
import { useHistory } from "react-router-dom";

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

export function addNoteToNotebook(notebookId, title, content, typeOfNote) {
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
          typeOfNote,
          imageUrl: "",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response status", res.status);

      dispatch(addANote(notebookId, title, content));
      dispatch(appDoneLoading());
      dispatch(
        showMessageWithTimeout("success", false, "note saved successfully")
      );
      dispatch(setRedirect());
    } catch (error) {
      console.error(error);
      dispatch(appDoneLoading());
      dispatch(
        showMessageWithTimeout("danger", true, "something went wrong", 1500)
      );
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
