import { combineReducers } from 'redux';
import authReducer from './auth';
import assetsReducer from './assets';
export default combineReducers({
    auth: authReducer,
    assets: assetsReducer
});