import React, { useState, useEffect } from "react";
import "./App.css";
import ListaInmuebles from "./components/views/ListaInmuebles";
import AppNavBar from "./components/layout/AppNavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import { Grid } from "@material-ui/core";
import UserRegister from "./components/security/UserResgister";
import Login from "./components/security/Login";
import { FirebaseContext } from "./server";

function App(props) {
  let firebase = React.useContext(FirebaseContext);
  const [initAuth, setupFirebaseInitil] = useState(false);

  useEffect(() => {
    firebase.isInit().then((val) => {
      setupFirebaseInitil(val);
    });
  });

  return initAuth !== false ? (
    <Router>
      <MuiThemeProvider theme={theme}>
        <AppNavBar />

        <Grid container>
          <Switch>
            <Route path="/auth/UserRegister" exact component={UserRegister} />
            <Route path="/" exact component={ListaInmuebles} />
            <Route path="/auth/Login" exact component={Login} />
          </Switch>
        </Grid>
      </MuiThemeProvider>
    </Router>
  ) : null;
}
export default App;
