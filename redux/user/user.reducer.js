import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null
}

// use ES6 default parameter syntax to set state = INITIAL_STATE if none exist
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }

    default:
      return state;
  }
}

export default userReducer;
