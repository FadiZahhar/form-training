import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";
import firbase from '../../app/config/firebase';

export function signInUser(creds) {
    return async function (dispatch) {
        try {
            const result = await firbase.auth().signInWithEmailAndPassword(creds.email, creds.password);
            dispatch({ type: SIGN_IN_USER, payload: result.user })
        } catch (error) {
            throw error
        }
    }
}

export function signOutUser(payload) {
    return {
        type: SIGN_OUT_USER,

    }
}