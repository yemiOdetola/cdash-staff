import { FETCH_ASSETS_CONTAINERS, ASSETS, ASSET_DATA, RECURRING_DATA, CLEAR } from '../constants';

const initialState = {
  assetsContainers: [],
  assets: [],
  recurring_data: {},
  asset_data: {}
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
    case CLEAR:
      const empty = {};
      return {
        ...state,
        assets: [],
        asset_data: empty,
        assetsContainers: []
      }
    default:
      return state;
  }
}