import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export default class ListaInmuebles extends Component {
  render() {
    return (
      <div>
        <Button variant="contained" color="primary">
          Primario
        </Button>
        <Button variant="contained" color="secondary">
          Segundario
        </Button>
      </div>
    );
  }
}
