import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { isCompositeComponent } from 'react-dom/test-utils';

const config = {
    apiKey: "AIzaSyD7a1ClfQ8G5zya3ZqGc1TZvp5TCHGipWM",
    authDomain: "unilad-clothing-db.firebaseapp.com",
    databaseURL: "https://unilad-clothing-db.firebaseio.com",
    projectId: "unilad-clothing-db",
    storageBucket: "unilad-clothing-db.appspot.com",
    messagingSenderId: "799579173273",
    appId: "1:799579173273:web:60d702fc31c13088cea308",
    measurementId: "G-MN2FN5DS6D"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

