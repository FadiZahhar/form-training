
import { setUserProfileData } from './firestoreService';
import { toast } from 'react-toastify';
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    updateProfile,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    updatePassword,
} from "firebase/auth";
import { getDatabase, ref as fbRef, push, query, orderByKey, limitToLast } from 'firebase/database';
import { getStorage, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { app } from '../config/firebase';

const auth = getAuth(app);
const db = getDatabase(app);

export function firebaseObjectToArray(snapshot) {
    if (snapshot) {
        return Object.entries(snapshot).map(e => Object.assign({}, e[1], { id: e[0] }))
    }
}

export function signInWithEmail(creds) {
    return signInWithEmailAndPassword(auth, creds.email, creds.password);
}

export function signOutFirebase() {
    return signOut(auth);
}

export async function registerInFirebase(creds) {
    try {
        const result = await createUserWithEmailAndPassword(auth, creds.email, creds.password);
        await updateProfile(result.user, {
            displayName: creds.displayName
        })
        return await setUserProfileData(result.user);
    } catch (error) {
        throw error;
    }
}

export async function socialLogin(selectedProvider) {
    let provider;
    if (selectedProvider === 'facebook') {
        provider = new FacebookAuthProvider();
    }
    if (selectedProvider === 'google') {
        provider = new GoogleAuthProvider();
    }
    try {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        if (result._tokenResponse.isNewUser) {
            await setUserProfileData(result.user);
        }
    } catch (error) {
        toast.error(error.message);
    }
}

export function updateUserPassword(creds) {
    const user = auth.currentUser;
    return updatePassword(user, creds.newPassword1);
}

export function uploadToFirebaseStorage(file, filename) {
    const user = auth.currentUser;
    const storage = getStorage(app);
    const storageRef = ref(storage, `${user.uid}/user_images/${filename}`);
    return uploadBytesResumable(storageRef, file);
}

export function deleteFromFirebaseStorage(filename) {
    const userUid = auth.currentUser.uid;
    const storage = getStorage(app);
    const storageRef = ref(storage, `${userUid}/user_images/${filename}`);
    return deleteObject(storageRef)
}

export function addEventChatComment(eventId, values) {
    const user = auth.currentUser;
    const newComment = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        text: values.comment,
        date: Date.now(),
        parentId: values.parentId
    }
    return push(fbRef(db, `chat/${eventId}`), newComment);
}

export function getEventChatRef(eventId) {
    return query(fbRef(db, `chat/${eventId}`), orderByKey())
}

export function getUserFeedRef() {
    const user = auth.currentUser;
    if (!user) return;
    return query(fbRef(db, `posts/${user.uid}`), orderByKey(), limitToLast(5))
}









// import { toast } from 'react-toastify';
// import firebase from '../config/firebase';
// import { setUserProfileData } from './firestoreService';

// export function firebaseObjectToArray(snapshot) {
//     if (snapshot) {
//         return Object.entries(snapshot).map(e => Object.assign({}, e[1], { id: e[0] }))
//     }
// }

// export function signInWithEmail(creds) {
//     return firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
// }

// export function signOutFirebase() {
//     return firebase.auth().signOut()
// }

// export async function registerInFirebase(creds) {
//     try {
//         const result = await firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password)
//         await result.user.updateProfile({
//             displayName: creds.displayName
//         });
//         return await setUserProfileData(result.user)
//     } catch (error) {
//         throw error
//     }
// }

// export async function socialLogin(selectedProvider) {
//     let provider;
//     if (selectedProvider === 'facebook') {
//         provider = new firebase.auth.FacebookAuthProvider();
//     }
//     if (selectedProvider === 'google') {
//         provider = new firebase.auth.GoogleAuthProvider();
//     }
//     try {
//         const result = await firebase.auth().signInWithPopup(provider)
//         console.log(result)
//         if (result.additionalUserInfo.isNewUser) {
//             await setUserProfileData(result.user)
//         }

//     } catch (error) {
//         toast.error(error.message)

//     }
// }

// export function updateUserPassword(creds) {
//     const user = firebase.auth().currentUser
//     return user.updatePassword(creds.newPassword1)
// }

// export function uploadToFirebaseStorage(file, filename) {
//     const user = firebase.auth().currentUser;
//     const storageRef = firebase.storage().ref();
//     return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
// }

// export function deleteFromFirebaseStorage(filename) {
//     const userUid = firebase.auth().currentUser.uid;
//     const storageRef = firebase.storage().ref();
//     const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);
//     return photoRef.delete();
// }

// export function addEventChatComment(eventId, values) {
//     const user = firebase.auth().currentUser;
//     const newComment = {
//         displayName: user.displayName,
//         photoURL: user.photoURL,
//         uid: user.uid,
//         text: values.comment,
//         date: Date.now(),
//         parentId: values.parentId
//     }
//     return firebase.database().ref(`chat/${eventId}`).push(newComment)
// }

// export function getEventChatRef(eventId) {
//     return firebase.database().ref(`chat/${eventId}`).orderByKey()
// }