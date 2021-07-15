import {
    INIT_AUTH,
    LOGIN,
    LOGOUT,
    UPDATE_AUTH_FIELD,
    USER_FETCHED,
    USER_UPDATED,
    OTP_REQUEST,
    REGISTER
} from "./types";
import agent from "../../agent";

export const register = (mobile) => {
    return {
        type: REGISTER,
        payload: agent.Auth.register(mobile)
    }
}

export const login = (mobile) => {
    return {
        type: OTP_REQUEST,
        payload: agent.Auth.login(mobile)
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const verify = (mobile, otp, deviceToken) => {
    return {
        type: LOGIN,
        payload: agent.Auth.verify(mobile, otp, deviceToken)
    }
}

export const updateField = (key, value) => {
    return {
        type: UPDATE_AUTH_FIELD,
        key,
        value
    }
}

export const initAuth = (token) => {
    return {
        type: INIT_AUTH,
        payload: { token, isAuthenticated: true }
    }
}

export const fetchUser = (userId = null) => {
    return {
        type: USER_FETCHED,
        payload: agent.Auth.fetchUser(userId)
    }
}

export const updateUser = (user) => {
    if (!user || (!user.name && !user.email && !user.mobile)) return;
    return {
        type: USER_UPDATED,
        payload: agent.Auth.updateUser(user)
    }
}