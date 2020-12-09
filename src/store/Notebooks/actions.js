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
