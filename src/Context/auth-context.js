import React, { useState, useEffect } from "react";
import { auth, db } from "../Services/firebase";
// import { useHistory } from "react-router-dom";
// import history from "../Helpers/history";

const AuthContext = React.createContext({
  user: {
    id: "",
    name: "",
    email: "",
    phone: "",
    dob: "",
    photoUrl: "", // from auth
    parentPhone: "",
    preferences: [],
    bookmarks: [],
    cart: [],
    orders: [],
    completedCourses: [],
    ongoingCourses: [],
    ongoingDocIds: []
  },
  isLoggedIn: false,
  setUser: (user) => {},
  setIsLoggedIn: () => {},
  logout: () => {},
  setHistory: () => {}
});

export const AuthContextProvider = (props) => {
  // in db collection will be students, but in all other places it willl be user in end-user application
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [history, setHistory] = useState(null);
  // set ongoing doc id to reduce read, intialy store it once and use it everywhere
  // const [ongoingCourseIds, setOngoingCourseIds] = useState(null);

  useEffect(() => {
    console.log("authcontext useEffect", localStorage.getItem("userId"));
    //
    console.log("currentUser", auth.currentUser);
    console.log("auth-context--------", localStorage.getItem("userId"));
    if (localStorage.getItem("userId") !== null) {
      auth.onAuthStateChanged((user) => {
        if (user !== null) {
          // refreshed the page, not logged out yet
          console.log(
            "Auth-Context: refreshed the page, not logged out yet",
            user.displayName
          );
          let userId = user.uid;
          let photoUrl = user.photoURL;
          db.collection("students")
            .doc(userId)
            .get()
            .then((doc) => {
              let user = doc.data();
              // to identify, whether reloading or closing the tab
              // sessionStorage.setItem("userId", userId);
              // checking if any other person is logged in
              // if (user.isLoggedIn) {
              //   console.log("user.isLoggedIn---false");
              //   // history.replace("/login?action=1");
              //   setIsLoggedIn(false);
              // } else {
              //   console.log("user.isLoggedIn---true");
              //   setIsLoggedIn(true);
              // }
              setIsLoggedIn(true);

              // should also capture ongoing courses that will get later
              // return user;
              let list = [];
              let ongoingIds = [];
              db.collection("students")
                .doc(userId)
                .collection("ongoingCourses")
                .get()
                .then((docs) => {
                  docs.forEach((doc) => {
                    // console.log("ongoingCourses", doc.courses);
                    let docId = doc.id;
                    let ongoingCourses = doc.data().courses;
                    list = [...list, ...ongoingCourses];
                    // mostly it will be one, but for future safety purpose, has egiven like array
                    ongoingIds.push(docId);
                  });
                })
                .then(() => {
                  setUser({
                    ...user,
                    isLoggedIn: true,
                    photoUrl: photoUrl,
                    ongoingCourses: list,
                    ongoingDocIds: ongoingIds
                  });
                  // setOngoingCourseIds(ongoingIds);
                })
                .catch((e) => console.log("set ongoingCourses", e));
            })
            .then(() => {
              console.log("ongoingcoursesssss");
            })
            .catch((e) => console.log("auth-context", e));
        } else {
          // logged out, so no user
          console.log("user is not logged in");
          history.replace("/login");
        }
      });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const setMyUser = (user) => {
    setUser(user);
  };

  const setLoggedIn = (status) => {
    setIsLoggedIn(status);
  };

  const setHistoryProp = (history) => {
    setHistory(history);
  };

  const logoutHandler = () => {
    // Assume that the user/student id is set, when logged in
    // so using that id itself, to get that document
    try {
      db.collection("students")
        .doc(user.id)
        .update({
          isLoggedIn: false
        })
        .then(() => {
          localStorage.removeItem("userId");
          setIsLoggedIn(false);
          // auth is here bcs, if we logout using auth, then we cant access the firestore
          auth
            .signOut()
            .then(() => {
              console.log("signed out successfully!!!");
              // delete the userId, which we save in localstorage

              // console.log("history", history);
              // can move it up, to show up faster to the user
              history.replace("/login");
            })
            .catch((e) => console.log("logout-authContext", e));
        })
        .catch((e) => console.log("logout-authContext", e));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setMyUser,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setLoggedIn,
        logout: logoutHandler,
        setHistory: setHistoryProp
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
