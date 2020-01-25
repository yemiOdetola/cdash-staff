import { combineReducers } from 'redux';
import authReducer from './auth';
import assetsReducer from './assets';
import socialsReducer from './socials';

export default combineReducers({
    auth: authReducer,
    assets: assetsReducer,
    socials: socialsReducer
});