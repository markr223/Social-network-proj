import axios from "axios";
import * as actionTypes from "./actionType";
import { serverURI, defaultConfig } from "../consts/consts";

const getPosts = (posts) => {
  return {
    type: actionTypes.GET_ALL_POSTS,
    payload: {
      posts,
    },
  };
};
export const loadPostsFromServer = () => {
  return (dispatch) => {
    axios
      .get(serverURI + "/api/Post/GetAllPosts", defaultConfig)
      .then((response) => {
        dispatch(getPosts(response.data));
      })
      .catch((error) => alert(error + "Error on loading posts"));
  };
};

export const loadUserPostFromServer = (userId) => {
  return (dispatch) => {
    axios
      .get(serverURI + "/api/User/GetAllUsers" + userId, defaultConfig)
      .then((response) => {
        dispatch(getPosts(response.data));
      })
      .catch((error) => alert(error + "Error on loading user posts"));
  };
};
const getUsers = (users) => {
  return {
    type: actionTypes.GET_USERS,
    payload: {
      users,
    },
  };
}

export const loadUsers = () => {
  return (dispatch) => {
    axios
      .get(serverURI + "/api/User/GetAllUsers", defaultConfig)
      .then((response) => {
        dispatch(getUsers(response.data));
      })
      .catch((error) => alert(error + "Error on Loading users"));
  };
};
