import { FETCH_SOCIALS, FETCH_SOCIAL_DETAILS, CLEAR } from '../constants';

const initialState = {
  socialDetails: {},
  socials: []
}

export default function socials(state = initialState, action) {
  switch (action.type) {
    case FETCH_SOCIALS:
      return {
        ...state,
        socials: [...state.socials, action.payload]
      }
    case FETCH_SOCIAL_DETAILS:
      let socialDetails = Object.assign({}, action.payload);
      return {
        ...state,
        socialDetails: socialDetails
      }
    case CLEAR:
      let empty = {};
      return {
        ...state,
        socials: [],
        socialDetails: empty,
      }
    default:
      return state;
  }
}