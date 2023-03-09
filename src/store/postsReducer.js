import * as actionTypes from "./actionType";

let initialState = {
  posts: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
      };
    default:
      return state;
  }
};
export default postsReducer;
