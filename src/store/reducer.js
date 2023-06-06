import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import usersReducer from "./usersReducer";

const reducer = combineReducers({
  postsFromStore: postsReducer,
  allUsers: usersReducer
});
export default reducer;
