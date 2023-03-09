import { combineReducers } from "redux";
import postsReducer from "./postsReducer";

const reducer = combineReducers({
  postsFromStore: postsReducer,
});
export default reducer;
