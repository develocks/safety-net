import firebase from "firebase/app";
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/messaging";

const firebaseConfig =
  process.env.NODE_ENV === "production"
    ? JSON.parse(process.env.FIREBASE)
    : require("./firebaseConfig.json");
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
