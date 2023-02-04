import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

// config for institute
const config = {
  apiKey: "AIzaSyAfwW9eS7_rOdiS7kjavZVhJk-Cb95rnik",
  authDomain: "meritbodhi-courses.firebaseapp.com",
  projectId: "meritbodhi-courses",
  storageBucket: "meritbodhi-courses.appspot.com",
  messagingSenderId: "352967957649",
  appId: "1:352967957649:web:4ed3558194774b41af7330",
  measurementId: "G-7DTG94NNBW"
};

const institute = firebase.initializeApp(config);
institute.analytics();
// firebase.analytics();
const db = institute.firestore();
const auth = institute.auth();
db.enablePersistence({ experimentalTabSynchronization: true })
  .then(() => {
    console.log("Woohoo! Multi-Tab Persistence!");
  })
  .catch((err) => {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log(
        "multiple tab is opened please close this tab and use only one tab, when offline"
      );
    } else if (err.code === "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log(
        "Current Browser or its version doesn't support offline mode"
      );
    }
  });
export { db, auth, firebase };
