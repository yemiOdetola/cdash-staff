import { FETCH_ASSETS_CONTAINERS, ASSETS, ASSET_DATA, RECURRING_DATA, ASSETS_ALL, OTHERS, HARDWARE, SOFTWARE, BUSINESS_CONTINUITY, CONNECTIVITY, CLEAR } from '../constants';

const initialState = {
  assetsContainers: [],
  assets: [],
  assetsAll: [],
  recurring_data: {},
  asset_data: {},
  hardware: false,
  software: false,
  connectivity: false,
  others: false,
  business_continuity: false
}

export default function assets(state = initialState, action) {
  switch (action.type) {
    case FETCH_ASSETS_CONTAINERS:
      return {
        ...state,
        assetsContainers: [...state.assetsContainers, action.payload]
      }
    case ASSETS:
      return {
        ...state,
        assets: [...state.assets, action.payload]
      }
    case ASSETS_ALL:
      return {
        ...state,
        assetsAll: [...state.assetsAll, action.payload]
      }
    case RECURRING_DATA:
      const recurring_data = Object.assign({}, action.payload);
      return {
        ...state,
        recurring_data: recurring_data
      }
    case ASSET_DATA:
      const asset_data = Object.assign({}, action.payload);
      return {
        ...state,
        asset_data: asset_data
      }
    case HARDWARE:
      console.log(action.payload);
      return {
        ...state,
        hardware: action.payload
      }
    case SOFTWARE:
      console.log(action.payload);
      return {
        ...state,
        software: action.payload
      }
      case BUSINESS_CONTINUITY:
        console.log(action.payload);
        return {
          ...state,
          business_continuity: action.payload
        }
    case CONNECTIVITY:
      console.log(action.payload);
      return {
        ...state,
        connectivity: action.payload
      }
    case OTHERS:
      console.log(action.payload);
      return {
        ...state,
        others: action.payload
      }
    case CLEAR:
      const empty = {};
      return {
        ...state,
        assets: [],
        asset_data: empty,
        assetsAll: [],
        assetsContainers: []
      }
    default:
      return state;
  }
}