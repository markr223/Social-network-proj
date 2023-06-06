import * as actionTypes from "./actionType";

let initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
    console.log(action);
  switch (action.type) {
    case actionTypes.GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
};
export default usersReducer;
