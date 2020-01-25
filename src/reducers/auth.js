import { LOGIN, FETCH_USERS, FETCH_USERS_DETAILS, CLEAR } from '../constants';

const initialState = {
  user: {},
  userDetails: {},
  users: [],
  staffs: []
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      let user = Object.assign({}, action.payload);
      return {
        ...state,
        user
      }
    case FETCH_USERS:
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    case FETCH_USERS_DETAILS:
      let userDetails = Object.assign({}, action.payload);
      return {
        ...state,
        userDetails: userDetails
      }
    case CLEAR:
      return {
        ...state,
        user: {},
        staffs: [],
        users: []
      }
    default:
      return state;
  }
}