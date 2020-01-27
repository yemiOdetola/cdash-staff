import { CLEAR, ASSETS_COUNT, STAFFS_COUNT, AVG_SCORE, USERS_COUNT, AVERAGE, FETCH_MATURITY } from '../constants';

const initialState = {
  assets: '',
  staffs: '',
  users: '',
  avgScore: '',
  maturity: [],
  average: ''
}

export default function summary(state = initialState, action) {
  switch (action.type) {

    case ASSETS_COUNT:
      return {
        ...state,
        assets: action.payload
      }
    case STAFFS_COUNT:
      return {
        ...state,
        staffs: action.payload
      }
    case USERS_COUNT:
      return {
        ...state,
        users: action.payload
      }
    case AVG_SCORE:
      return {
        ...state,
        avgScore: action.payload
      }
      case AVERAGE:
      return {
        ...state,
        average: action.payload
      }
      case FETCH_MATURITY:
        return {
          ...state,
          maturity: [...state.maturity, action.payload]
        }
    case CLEAR:
      return {
        ...state,
        staffs: '',
        users: '',
        assets: '',
        avgScore: '',
        average: '',
        maturity: []
      }
    default:
      return state;
  }
}