import React, { Component } from "react";
import {
  Container,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { consumerFirebase } from "../../server";
import { snackbarMessage } from "../../sesion/actions/snackbarAction";

const style = {
  container: {
    paddingTop: "8px",
  },
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  link: {
    display: "flex",
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: "4px",
  },
  submit: {
    marginTop: 15,
    marginBottm: 10,
  },
};

class newPropierty extends Component {
  state = {
    propierty: {
      addres: "",
      country: "",
      city: "",
      description: "",
      interior: "",
    },
  };

  entriesToState = (e) => {
    let propierty = Object.assign({}, this.state.propierty);
    propierty[e.target.name] = e.target.value;
    this.setState({
      propierty,
    });
  };

  savePropierty = () => {
    const { propierty } = this.state;
    const firebase = this.props.firebase;

    firebase.db
      .collection("Propierties")
      .add(propierty)
      .then((success) => {
        this.props.history.push("/");
        console.log("Propierty saved!");

        // snackbarMessage({
        //   open: true,
        //   message: "Propierty saved!",
        // });
      })
      .catch((error) => {
        console.log("Fail when write in the database: " + error);
        // snackbarMessage({
        //   open: true,
        //   message: "Fail when write in the database: " + error,
        // });
      });
  };

  render() {
    const {
      addres,
      country,
      city,
      description,
      interior,
    } = this.state.propierty;
    return (
      <Container style={style.container}>
        <Paper style={style.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Breadcrumbs aria-label='breadcrumb'>
                <Link color='inherit' style={style.link} href='/'>
                  <HomeIcon style={style.homeIcon} />
                  Home
                </Link>
                <Typography color='textPrimary'>New Propierty</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name='addres'
                onChange={this.entriesToState}
                value={addres}
                label='Propierty addres'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name='country'
                onChange={this.entriesToState}
                value={country}
                label='Country'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name='city'
                onChange={this.entriesToState}
                value={city}
                label='City'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name='description'
                onChange={this.entriesToState}
                value={description}
                label='Propiety Description'
                fullWidth
                multiline
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name='interior'
                onChange={this.entriesToState}
                value={interior}
                label='Propiety Interior'
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
          <Grid container justify='center'>
            <Grid item xs={12} md={6}>
              <Button
                type='button'
                fullWidth
                variant='contained'
                size='large'
                color='primary'
                style={style.submit}
                onClick={this.savePropierty}
              >
                !Save!
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}
export default consumerFirebase(newPropierty);
