import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCC0kG1YS57gbR5gSHJidXTdKwPJqNAvVs",
    authDomain: "revents-course-335211.firebaseapp.com",
    projectId: "revents-course-335211",
    storageBucket: "revents-course-335211.appspot.com",
    messagingSenderId: "647956481242",
    appId: "1:647956481242:web:6d8f1d1e20d74256b9d1e3"
}

firebase.initializeApp(firebaseConfig)
firebase.fireStore()

export default firebase