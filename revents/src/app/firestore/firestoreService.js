
import {
    getFirestore,
    collection,
    Timestamp,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    arrayUnion,
    arrayRemove,
    updateDoc,
    query,
    orderBy,
    where,
    deleteDoc,
    serverTimestamp,
    increment,
    writeBatch,
    limit,
    startAfter
} from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import { app } from '../config/firebase';

const db = getFirestore(app);
const auth = getAuth(app);

export function dataFromSnapshot(snapshot) {
    if (!snapshot.exists) return undefined;
    const data = snapshot.data();

    for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
            if (data[prop] instanceof Timestamp) {
                data[prop] = data[prop].toDate();
            }
        }
    }

    return {
        ...data,
        id: snapshot.id,
    };
}

export function fetchEventsFromFirestore(
    filter,
    startDate,
    pageSize,
    lastDocSnapshot = null
) {
    const user = auth.currentUser;
    const q = query(collection(db, 'events'), orderBy('date'), startAfter(lastDocSnapshot), limit(pageSize));
    switch (filter) {
        case 'isGoing':
            return query(q,
                where('attendeeIds', 'array-contains', user.uid),
                where('date', '>=', startDate)
            )
        case 'isHost':
            return query(q,
                where('hostUid', '==', user.uid),
                where('date', '>=', startDate)
            )
        default:
            return query(q,
                where('date', '>=', startDate))
    }
}

export function listenToEventFromFirestore(eventId) {
    return doc(db, 'events', eventId);
}

export function addEventToFirestore(event) {
    const user = auth.currentUser;
    return addDoc(collection(db, 'events'), {
        ...event,
        hostUid: user.uid,
        hostedBy: user.displayName,
        hostPhotoURL: user.photoURL || null,
        attendees: arrayUnion({
            id: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL || null
        }),
        attendeeIds: arrayUnion(user.uid)
    })
}

export function updateEventInFirestore(event) {
    const eventDoc = doc(db, 'events', event.id);
    return updateDoc(eventDoc, event);
}

export function deleteEventInFirestore(eventId) {
    return deleteDoc(doc(db, 'events', eventId));
}

export function cancelEventToggle(event) {
    const eventDoc = doc(db, 'events', event.id);
    return updateDoc(eventDoc, {
        isCancelled: !event.isCancelled
    })
}

export function setUserProfileData(user) {
    return setDoc(doc(db, 'users', user.uid), {
        displayName: user.displayName,
        email: user.email,
        createdAt: serverTimestamp()
    })
}

export function getUserProfile(userId) {
    return doc(db, 'users', userId);
}

export async function updateUserProfile(profile) {
    const user = auth.currentUser;
    try {
        if (user.displayName !== profile.displayName) {
            updateProfile(user, {
                displayName: profile.displayName
            })
        }
        return await updateDoc(doc(db, 'users', user.uid), profile)
    } catch (error) {
        throw error;
    }
}

export async function updateUserProfilePhoto(downloadURL, filename) {
    const user = auth.currentUser;
    const userDocRef = doc(db, 'users', user.uid);
    try {
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.data().photoURL) {
            await updateDoc(userDocRef, {
                photoURL: downloadURL
            });
            await updateProfile(user, {
                photoURL: downloadURL
            })
        }
        return await addDoc(collection(db, 'users', user.uid, 'photos'), {
            name: filename,
            url: downloadURL
        })
    } catch (error) {
        console.log('fserror', error)
        throw error;
    }
}

export function getUserPhotos(userUid) {
    return collection(db, 'users', userUid, 'photos');
}

export async function setMainPhoto(photo) {
    const user = auth.currentUser;
    const today = new Date();
    const eventDocQuery = query(collection(db, 'events'),
        where('attendeeIds', 'array-contains', user.uid),
        where('date', '>=', today));
    const userFollowingRef = collection(db, 'following', user.uid, 'userFollowing');
    const batch = writeBatch(db);

    batch.update(doc(db, 'users', user.uid), {
        photoURL: photo.url
    })

    try {
        const eventsQuerySnap = await getDocs(eventDocQuery);
        for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
            let eventDoc = eventsQuerySnap.docs[i];
            if (eventDoc.data().hostUid === user.uid) {
                batch.update(eventsQuerySnap.docs[i].ref, {
                    hostPhotoURL: photo.url
                })
            }
            batch.update(eventsQuerySnap.docs[i].ref, {
                attendees: eventDoc.data().attendees.filter(attendee => {
                    if (attendee.id === user.uid) {
                        attendee.photoURL = photo.url
                    }
                    return attendee;
                })
            })
        }
        const userFollowingSnap = await getDocs(userFollowingRef);
        userFollowingSnap.docs.forEach(docRef => {
            let followingDocRef = doc(db, 'following', docRef.id, 'userFollowers', user.uid);
            batch.update(followingDocRef, {
                photoURL: photo.url
            })
        })

        await batch.commit();

        return await updateProfile(user, {
            photoURL: photo.url
        })
    } catch (error) {
        throw error;
    }
}

export function deletePhotoFromCollection(photoId) {
    const userUid = auth.currentUser.uid;
    return deleteDoc(doc(db, 'users', userUid, 'photos', photoId));
}

export function addUserAttendance(event) {
    const user = auth.currentUser;
    return updateDoc(doc(db, 'events', event.id), {
        attendees: arrayUnion({
            id: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL || null
        }),
        attendeeIds: arrayUnion(user.uid)
    })
}

export async function cancelUserAttendance(event) {
    const user = auth.currentUser;
    try {
        const eventDoc = await getDoc(doc(db, 'events', event.id));
        return updateDoc(doc(db, 'events', event.id), {
            attendees: eventDoc.data().attendees.filter(attendee => attendee.id !== user.uid),
            attendeeIds: arrayRemove(user.uid)
        })
    } catch (error) {
        throw error;
    }
}

export function getUserEventsQuery(activeTab, userUid) {
    let eventsRef = collection(db, 'events');
    const today = new Date();
    switch (activeTab) {
        case 1: // past events
            return query(eventsRef,
                where('attendeeIds', 'array-contains', userUid),
                where('date', '<=', today),
                orderBy('date', 'desc')
            )
        case 2: // hosted
            return query(eventsRef,
                where('hostUid', '==', userUid),
                orderBy('date')
            )
        default:
            return query(eventsRef,
                where('attendeeIds', 'array-contains', userUid),
                where('date', '>=', today),
                orderBy('date')
            )
    }
}

export async function followUser(profile) {
    const user = auth.currentUser;
    const batch = writeBatch(db);
    try {
        batch.set(doc(db, 'following', user.uid, 'userFollowing', profile.id), {
            displayName: profile.displayName,
            photoURL: profile.photoURL || '/assets/user.png',
            uid: profile.id
        });

        batch.update(doc(db, 'users', user.uid), {
            followingCount: increment(1)
        })
        return await batch.commit();
    } catch (e) {
        throw e
    }
}

export async function unfollowUser(profile) {
    const user = auth.currentUser;
    const batch = writeBatch(db);
    try {
        batch.delete(doc(db, 'following', user.uid, 'userFollowing', profile.id));
        batch.update(doc(db, 'users', user.uid), {
            followingCount: increment(-1)
        })
        return await batch.commit();
    } catch (e) {
        throw e;
    }
}

export function getFollowersCollection(profileId) {
    return collection(db, 'following', profileId, 'userFollowers');
}

export function getFollowingCollection(profileId) {
    return collection(db, 'following', profileId, 'userFollowing');
}

export function getFollowingDoc(profileId) {
    const userUid = auth.currentUser.uid;
    return getDoc(doc(db, 'following', userUid, 'userFollowing', profileId))
}














// import firebase from '../config/firebase';

// const db = firebase.firestore();

// export function dataFromSnapshot(snapshot) {
//     if (!snapshot.exists) return undefined;
//     const data = snapshot.data();

//     for (const prop in data) {
//         if (data.hasOwnProperty(prop)) {
//             if (data[prop] instanceof firebase.firestore.Timestamp) {
//                 data[prop] = data[prop].toDate()
//             }
//         }
//     }

//     return {
//         ...data,
//         id: snapshot.id
//     }
// }

// export function fetchEventsFromFirestore(predicate, limit, lastDocSnapshot = null) {
//     const user = firebase.auth().currentUser;
//     let eventsRef = db.collection('events').orderBy('date').startAfter(lastDocSnapshot).limit(limit);
//     switch (predicate.get('filter')) {
//         case 'isGoing':
//             return eventsRef
//                 .where('attendeeIds', 'array-contains', user.uid)
//                 .where('date', '>=', predicate.get('startDate'));
//         case 'isHost':
//             return eventsRef
//                 .where('hostUid', '==', user.uid)
//                 .where('date', '>=', predicate.get('startDate'));
//         default:
//             return eventsRef.where('date', '>=', predicate.get('startDate'));
//     }
// }

// export function listenToEventFromFirestore(eventId) {
//     return db.collection('events').doc(eventId)
// }

// export function addEventToFirestore(event) {
//     const user = firebase.auth().currentUser;
//     return db.collection('events').add({
//         ...event,
//         hostUid: user.uid,
//         hostedBy: user.displayName,
//         hostPhotoURL: user.photoURL || null,
//         attendees: firebase.firestore.FieldValue.arrayUnion({
//             id: user.uid,
//             displayName: user.displayName,
//             photoURL: user.photoURL || null,
//         }),
//         // we used an array because in firebase we can not got array of objects
//         //  we can query with Firestone arrays is simple string based arrays.
//         attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
//     })
// }

// export function updateEventInFirestore(event) {
//     return db.collection('events').doc(event.id).update(event)
// }

// export function deleteEventInFirestore(eventId) {
//     return db.collection('events').doc(eventId).delete()
// }

// export function cancelEventToggle(event) {
//     return db.collection('events').doc(event.id).update({
//         isCancelled: !event.isCancelled
//     })
// }

// export function setUserProfileData(user) {
//     return db.collection('users').doc(user.uid).set({
//         displayName: user.displayName,
//         email: user.email,
//         photoURL: user.photoURL || null,
//         createdAt: firebase.firestore.FieldValue.serverTimestamp()
//     })
// }

// export function getUserProfile(userId) {
//     return db.collection('users').doc(userId)
// }

// export async function updateUserProfile(profile) {
//     const user = firebase.auth().currentUser;
//     try {
//         if (user.displayName !== profile.displayName) {
//             await user.updateProfile({
//                 displayName: profile.displayName
//             })
//         }
//         return await db.collection('users').doc(user.uid).update(profile)
//     } catch (error) {
//         throw error
//     }
// }

// export async function updateUserProfilePhoto(downloadURL, filename) {
//     const user = firebase.auth().currentUser;
//     const userDocRef = db.collection('users').doc(user.uid)
//     try {
//         const userDoc = await userDocRef.get();
//         if (!userDoc.data().photoURL) {
//             await db.collection('users').doc(user.uid).update({
//                 photoURL: downloadURL
//             })
//             await user.updateProfile({
//                 photoURL: downloadURL
//             })
//         }
//         return await db.collection('users').doc(user.uid).collection('photos').add({
//             name: filename,
//             url: downloadURL
//         })
//     } catch (error) {
//         throw error
//     }
// }

// export function getUserPhotos(userUid) {
//     return db.collection('users').doc(userUid).collection('photos')
// }

// export async function setMainPhoto(photo) {
//     const user = firebase.auth().currentUser;
//     try {
//         await db.collection('users').doc(user.uid).update({
//             photoURL: photo.url
//         })
//         return await user.updateProfile({
//             photoURL: photo.url
//         })
//     } catch (error) {
//         throw error;
//     }
// }

// export function deletePhotoFromCollection(photoId) {
//     const userUid = firebase.auth().currentUser.uid;
//     return db.collection('users').doc(userUid).collection('photos').doc(photoId).delete();
// }

// export function addUserAttendance(event) {
//     const user = firebase.auth().currentUser
//     return db.collection('events').doc(event.id).update({
//         attendees: firebase.firestore.FieldValue.arrayUnion({
//             id: user.uid,
//             displayName: user.displayName,
//             photoURL: user.photoURL || null,
//         }),
//         attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
//     })
// }

// export async function cancelUserAttendance(event) {
//     const user = firebase.auth().currentUser

//     try {
//         const eventDoc = await db.collection('events').doc(event.id).get()
//         return db.collection('events').doc(event.id).update({
//             attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
//             attendees: eventDoc.data().attendees.filter(attendee => attendee.id !== user.uid)
//         })
//     } catch (error) {
//         throw error
//     }
// }

// export function getUserEventsQuery(activeTab, userUid) {
//     let eventsRef = db.collection('events');
//     const today = new Date();
//     switch (activeTab) {
//         case 1: // past events
//             return eventsRef
//                 .where('attendeeIds', 'array-contains', userUid)
//                 .where('date', '<=', today)
//                 .orderBy('date', 'desc');
//         case 2: // hosting
//             return eventsRef.where('hostUid', '==', userUid).orderBy('date');
//         default:
//             return eventsRef
//                 .where('attendeeIds', 'array-contains', userUid)
//                 .where('date', '>=', today)
//                 .orderBy('date');
//     }
// }

// export async function followUser(profile) {
//     const user = firebase.auth().currentUser;
//     // we used batch because we need these 4 to happen together all work on non of them work
//     const batch = db.batch()
//     try {
//         batch.set(db.collection('following').doc(user.uid).collection('userFollowing').doc(profile.id), {
//             displayName: profile.displayName,
//             photoURL: profile.photoURL,
//             uid: profile.id
//         })
//         batch.set(db.collection('following').doc(profile.id).collection('userFollowers').doc(user.uid), {
//             displayName: user.displayName,
//             photoURL: user.photoURL,
//             uid: user.uid
//         })
//         batch.update(db.collection('users').doc(user.uid), {
//             followingCount: firebase.firestore.FieldValue.increment(1)
//         })
//         batch.update(db.collection('users').doc(profile.id), {
//             followerCount: firebase.firestore.FieldValue.increment(1)
//         })
//         return await batch.commit()
//     } catch (error) {
//         throw error
//     }
// }

// export async function unfollowUser(profile) {
//     const user = firebase.auth().currentUser
//     const batch = db.batch()
//     try {
//         batch.delete(db.collection('following').doc(user.uid).collection('userFollowing').doc(profile.id))

//         batch.delete(await db.collection('following').doc(profile.id).collection('userFollowers').doc(user.uid))

//         batch.update(db.collection('users').doc(user.uid), {
//             followingCount: firebase.firestore.FieldValue.increment(-1)
//         })
//         batch.update(db.collection('users').doc(profile.id), {
//             followerCount: firebase.firestore.FieldValue.increment(-1)
//         })
//         return await batch.commit()
//     } catch (error) {
//         throw error
//     }
// }

// export function getFollowersCollection(profileId) {
//     return db.collection('following').doc(profileId).collection('userFollowers')
// }

// export function getFollowingCollection(profileId) {
//     return db.collection('following').doc(profileId).collection('userFollowing')
// }

// export function getFollowingDoc(profileId) {
//     const userUid = firebase.auth().currentUser
//     return db.collection('following').doc(userUid).collection('userFollowing').doc(profileId)
// }

