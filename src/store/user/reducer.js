import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  firstName: null,
  lastName: null,
  username: null,
  email: null,
  notebooks: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case "newNotebookSucces": {
      return {
        state,
        notebooks: [...state.notebooks, action.payload],
      };
    }

    case "updateProfile":
      return { ...state, ...action.payload };

    case "updatePassword":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
