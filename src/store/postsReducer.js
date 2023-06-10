import * as actionTypes from "./actionType";

let initialState = {
  posts: [],
  comments: []
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
      };
    case actionTypes.GET_POST_FOR_USER:
      return {
        ...state,
        posts: action.payload.posts
      }
    case actionTypes.GET_POST_COMMENT:
      const tempComment = [...this.state.comments];
      tempComment.push(action.payload.comments);
      return{
        ...state,
        comments: tempComment,
        postId: action.payload.postId
      }
    default:
      return state;
  }
};
export default postsReducer;
