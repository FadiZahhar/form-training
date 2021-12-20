import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";
import firbase from '../../app/config/firebase';
import { APP_LOADED } from '../../app/async/asyncReducer'
import { dataFromSnapshot, getUserProfile } from "../../app/firestore/firestoreService";
import profileReducer from "../profiles/profileReducer";
import { listenToCurrentUserProfile } from "../profiles/profileAction";

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
                const profileRef = getUserProfile(user.uid);
                profileRef.onSnapshot(snapshot => {
                    dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
                    dispatch({ type: APP_LOADED })
                })

            } else {
                dispatch(signOutUser())
                dispatch({ type: APP_LOADED })
            }
        })
    }
}

export function signOutUser(payload) {
    return {
        type: SIGN_OUT_USER,

    }
}