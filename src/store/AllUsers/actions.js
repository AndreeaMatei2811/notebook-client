import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../user/selectors";
import {
  appLoading,
  appDoneLoading,
  //   showMessageWithTimeout,
} from "../appState/actions";

export function allUsersFetched(allUsers) {
  return {
    type: "allUsersFetched",
    payload: allUsers,
  };
}

export function fetchAllUsers() {
  return async function thunk(dispatch, getState) {
    dispatch(appLoading());
    const { token } = selectUser(getState());
    const res = await axios.get(`${apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const allUsers = res.data;

    dispatch(allUsersFetched(allUsers));
    dispatch(appDoneLoading());
  };
}
