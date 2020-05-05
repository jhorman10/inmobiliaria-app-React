import React, { Component } from "react";
import Appbar from "@material-ui/core/AppBar";
import BarSesion from "./bar/BarSesion";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { consumerFirebase } from "../../server";
import { StateContext } from "../../sesion/store";

const styles = (theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});

class AppNavBar extends Component {
  static contextType = StateContext;

  state = {
    firebase: null,
  };

  componentDidMount() {
    const { firebase } = this.state; //local state
    const [{ sesion }, dispatch] = this.context; // global state

    if (firebase.auth.currentUser !== null && !sesion) {
      firebase.db
        .collection("Users")
        .doc(firebase.auth.currentUser.uid)
        .get()
        .then((doc) => {
          const userDB = doc.data();
          dispatch({
            type: "SESION_INIT",
            sesion: userDB,
            isAuthenticated: true,
          });
        });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newsObjects = {};
    if (nextProps.firebase !== prevState.firebase) {
      newsObjects.firebase = nextProps.firebase;
    }
    return newsObjects;
  }

  render() {
    const [{ sesion }, dispatch] = this.context;
    //console.log('appnavbasr: ',sesion);

    return sesion ? (
      sesion.isAuthenticated ? (
        <div>
          <Appbar position='static'>
            <BarSesion />
          </Appbar>
        </div>
      ) : null
    ) : null;
  }
}

export default compose(withStyles(styles), consumerFirebase)(AppNavBar);
