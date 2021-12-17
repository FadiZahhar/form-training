import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";
import firbase from '../../app/config/firebase';

export function signInUser(user) {
    return {
        type: SIGN_IN_USER,
        payload: user
    }
}

export function verifyAuth() {
    return function (dispatch) {
        return firbase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(signInUser(user))
            } else {
                dispatch(signOutUser())
            }
        })
    }
}

export function signOutUser(payload) {
    return {
        type: SIGN_OUT_USER,

    }
}