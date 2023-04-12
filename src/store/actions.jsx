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
      .catch((error) => alert("Error on loading posts"));
  };
};
