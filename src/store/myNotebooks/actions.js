import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../user/selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";

export function allMyNotebooksFetched(allMyNotebooks) {
  return {
    type: "allMyNotebooksFetched",
    payload: allMyNotebooks,
  };
}

export function fetchAllMyNotebooks() {
  return async function thunk(dispatch, getState) {
    dispatch(appLoading());
    const { token } = selectUser(getState());
    const res = await axios.get(`${apiUrl}/my-notebooks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const allMyNotebooks = res.data;

    dispatch(allMyNotebooksFetched(allMyNotebooks));
    dispatch(appDoneLoading());
  };
}
