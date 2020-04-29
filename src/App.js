import React, { useState, useEffect } from "react";
import "./App.css";
import ListaInmuebles from "./components/views/ListaInmuebles";
import AppNavBar from "./components/layout/AppNavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import { Grid } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import UserRegister from "./components/security/UserResgister";
import Login from "./components/security/Login";
import { FirebaseContext } from "./server";
import { useStateValue } from "./sesion/store";
import AuthenticatedRoutes from "./components/security/AuthenticatedRoutes";

function App(props) {
  let firebase = React.useContext(FirebaseContext);
  const [initAuth, setupFirebaseInitil] = useState(false);

  const [{ openSnackbar }, dispatch] = useStateValue();

  useEffect(() => {
    firebase.isInit().then((val) => {
      setupFirebaseInitil(val);
    });
  });

  return initAuth !== false ? (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={
          <span id="message-id">
            {openSnackbar ? openSnackbar.message : ""}
          </span>
        }
        onClose={() =>
          dispatch({
            type: "OPEN_SNACKBAR",
            openMessage: {
              open: false,
              message: "",
            },
          })
        }
      ></Snackbar>
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppNavBar />
          <Grid container>
            <Switch>
              <AuthenticatedRoutes 
                exact path="/"
                component={ListaInmuebles}
                FirebaseAuthenticate={firebase.auth.currentUser}
              />
              <Route path="/auth/UserRegister" exact component={UserRegister} />

              <Route path="/auth/Login" exact component={Login} />
            </Switch>
          </Grid>
        </MuiThemeProvider>
      </Router>
    </React.Fragment>
  ) : null;
}
export default App;
