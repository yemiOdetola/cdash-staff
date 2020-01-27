import { CLEAR, ASSETS_COUNT, STAFFS_COUNT, AVG_SCORE, USERS_COUNT, FETCH_MATURITY } from '../constants';

const initialState = {
  assets: '',
  staffs: '',
  users: '',
  avgScore: '',
  maturity: []
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
        maturity: []
      }
    default:
      return state;
  }
}