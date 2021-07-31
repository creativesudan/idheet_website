import {
    LOGIN,
    UPDATE_AUTH_FIELD,
    ASYNC_START,
    INIT_AUTH,
    LOGOUT,
    USER_FETCHED,
    USER_UPDATED
} from "../actions/types";
// import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    isAuthenticated: false,
    user: null,
    mobile: '',
    inProgress: true,
    userId: null,
    token: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ASYNC_START:
            return {
                ...state,
                inProgress: true
            }
        case INIT_AUTH:
            return {
                ...state,
                ...action.payload
            }
        case USER_FETCHED:
            return {
                ...state,
                user: action.payload
            }

        case LOGIN:
            if (action.error) {
                return {
                    ...state,
                    error: action.payload,
                    inProgress: false
                }
            }
            else {
                // console.log("LOGGED IN")
                return {
                    ...state,
                    isAuthenticated: true,
                    inProgress: false,
                    user: action.payload.user,
                    error: null
                }
            }
        case UPDATE_AUTH_FIELD:
            return { ...state, [action.key]: action.value };
        case LOGOUT:

            return initialState;
        case USER_UPDATED:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}