import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialstate = {};
const middleware = [thunk];
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
? window.__REDUX_DEVTOOLS_EXTENSION__()
: f => f

export const store = createStore(
    rootReducer, initialstate,
    compose(
        applyMiddleware(...middleware), devTools
    ));