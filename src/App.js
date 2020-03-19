import React, { Component } from "react";
import "./App.css";
import ListaInmuebles from "./components/views/ListaInmuebles";
import AppNavBar from './components/layout/AppNavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import { Grid } from "@material-ui/core";
import UserRegister from './components/security/UserResgister';

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={ theme }>
          <AppNavBar />

          <Grid container>
            <Switch>
              <Route path="/" exact component={ ListaInmuebles }/>
              <Route path="/auth/UserRegister" exact component={ UserRegister }/>
            </Switch>
          </Grid>

        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
