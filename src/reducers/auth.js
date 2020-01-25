import { LOGIN } from '../constants';

const initialState = {
    user: {},
    userDetails: {}
}

export default function auth(state = initialState, action) {
    switch (action.type) {
            case LOGIN:
            let user = Object.assign({}, action.payload);
            return {
                ...state,
                user
            }
        default:
            return state;
    }
}