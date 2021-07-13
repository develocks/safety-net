import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/messaging";
import "firebase/analytics";

import firebaseConfig from "./firebaseConfig.json";
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
