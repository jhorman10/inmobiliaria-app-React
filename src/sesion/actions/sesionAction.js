export const sesionInit = (dispatch, firebase, email, password) => {
  return new Promise((resolve, reject) => {
    firebase.auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        firebase.db
          .collection("Users")
          .doc(auth.user.uid)
          .get()
          .then((doc) => {
            const userDB = doc.data();
            dispatch({
              type: "SESION_INIT",
              sesion: userDB,
              isAuthenticated: true,
            });
            resolve();
          });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  });
};

export const createUser = (dispatch, firebase, user) => {
  const { email, password, name, lastname } = user;
  return new Promise((resolve, reject) => {
    firebase.auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        firebase.db
          .collection("Users")
          .doc(auth.user.uid)
          .set(
            {
              id: auth.user.uid,
              email,
              name,
              lastname,
            },
            { merge: true }
          )
          .then((doc) => {
            user.id = auth.user.uid;
            dispatch({
              type: "SESION_INIT",
              sesion: user,
              isAuthenticated: true,
            });
            resolve();
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      });
  });
};

export const endSesion = (dispatch, firebase) => {
  return new Promise((resolve, reject) => {
    firebase.auth.signOut().then((leave) => {
      dispatch({
        type: "SESION_END",
        newUser: {
          name: "",
          lastname: "",
          email: "",
          picture: "",
          id: "",
          phoneNumber: "",
        },
        isAuthenticated: false,
      });
      resolve();
    })
    .catch((error) => {
        console.log("Error: ", error);
    });
  });
};
