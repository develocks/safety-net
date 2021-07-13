import firebase from "./firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
};

export default function Login() {
  return (
    <div>
      <span>You need to be signed in to view this page</span>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}
