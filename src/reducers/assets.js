import { FETCH_ASSETS_CONTAINERS, ASSETS } from '../constants';

const initialState = {
  assetsContainers: [],
  assets: []
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
    default:
      return state;
  }
}