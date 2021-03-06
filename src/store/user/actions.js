import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const newNotebookSucces = (newNotebook) => ({
  type: "newNotebookSucces",
  payload: newNotebook,
});

export function newNotebook(name, subjectId) {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    // console.log("token", token);
    console.log("req", name, subjectId);
    dispatch(appLoading());

    const response = await axios.post(
      `${apiUrl}/notebooks`,
      {
        name,
        subjectId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(
      showMessageWithTimeout("success", false, response.data.message, 3000)
    );

    dispatch(newNotebookSucces(response.data));

    dispatch(appDoneLoading());
  };
}

export const signUp = (firstName, lastName, username, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        firstName,
        lastName,
        username,
        email,
        password,
      });
      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (username, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        username,
        password,
      });
      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

const updateSuccess = (updateUser) => {
  return {
    type: "updateProfile",
    payload: updateUser,
  };
};

export const updateProfile = (username, firstName, lastName, email) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = selectToken(getState());

    try {
      const response = await axios.patch(
        `${apiUrl}/users/update-user`,
        {
          username,
          firstName,
          lastName,
          email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(updateSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "Profile updated."));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

const updatePictureSuccess = (updatePicture) => {
  return {
    type: "updateProfilePicture",
    payload: updatePicture,
  };
};

export const updateProfilePic = (imageUrl) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    try {
      const res = await axios.patch(
        `${apiUrl}/users/update-picture`,
        {
          imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(updatePictureSuccess(res.data));
      dispatch(
        showMessageWithTimeout("success", true, "Profile picture updated.")
      );
      dispatch(appDoneLoading());
    } catch (error) {
      console.error(error);
    }
  };
};

export const postProfilePic = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dayvqdldr/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      console.log("what is response", res);

      const image = await res.json();

      const imageUrl = image.secure_url;

      console.log("imageurl", imageUrl);
      dispatch(updateProfilePic(imageUrl));
    } catch (error) {
      console.error(error);
    }
  };
};

const updatePasswordSuccess = (updateUserPassword) => {
  return {
    type: "updatePassword",
    payload: updateUserPassword,
  };
};

export const updatePassword = (password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = selectToken(getState());

    try {
      const response = await axios.patch(
        `${apiUrl}/users/update-password`,
        {
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(updatePasswordSuccess(response.data));
      dispatch(
        showMessageWithTimeout("success", true, "Password succesfully updated.")
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
