import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";

export function signInUser(payload) {
    return {
        type: SIGN_IN_USER,
        // when the parameter is same word as the attribute we can make shortcut and just payload rather than payload:payload
        payload
    }
}

export function signOutUser(payload) {
    return {
        type: SIGN_OUT_USER,

    }
}