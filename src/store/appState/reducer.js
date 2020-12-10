import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from "./actions";

const initialState = {
  loading: false,
  message: null,
  redirect: false,
};

export default function appState(state = initialState, action) {
  switch (action.type) {
    case APP_LOADING:
      return { ...state, loading: true };

    case APP_DONE_LOADING:
      return { ...state, loading: false };

    case SET_MESSAGE:
      return { ...state, message: action.payload };

    case CLEAR_MESSAGE:
      return { ...state, message: null };

    case "REDIRECT":
      return { ...state, redirect: true };

    case "CLEAR_REDIRECT":
      return { ...state, redirect: false };

    default:
      return state;
  }
}
