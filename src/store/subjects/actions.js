import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../user/selectors";
import {
  appLoading,
  appDoneLoading,
  //   showMessageWithTimeout,
} from "../appState/actions";

export function allSubjectsFetched(allSubjects) {
  return {
    type: "allSubjectsFetched",
    payload: allSubjects,
  };
}

export function fetchAllSubjects() {
  return async function thunk(dispatch, getState) {
    dispatch(appLoading());
    const { token } = selectUser(getState());
    const res = await axios.get(`${apiUrl}/subjects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const allSubjects = res.data;

    dispatch(allSubjectsFetched(allSubjects));
    dispatch(appDoneLoading());
  };
}
