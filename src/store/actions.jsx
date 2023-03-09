import axios from "axios";
import * as actionTypes from "./actionType";

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
      .get("http://localhost:43619/api/Post/GetAllPosts")
      .then((response) => {
        dispatch(getPosts(response.data));
      })
      .catch((error) => alert("Error on loading posts"));
  };
};
