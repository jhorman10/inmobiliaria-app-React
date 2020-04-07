import React, { Component } from "react";
import Appbar from "@material-ui/core/AppBar";
import BarSesion from "./bar/BarSesion";

export default class AppNavBar extends Component {
  render() {
    return (
      <div>
        <Appbar position="static">
          <BarSesion />
        </Appbar>
      </div>
    );
  }
}
