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
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { consumerFirebase } from "../../server";
import { snackbarMessage } from "../../sesion/actions/snackbarAction";
import { CreateKeyWord } from "../../sesion/actions/keyWord";
import { StateContext } from "../../sesion/store";
import ImageUploader from "react-images-upload";
import { v4 as uuidv4 } from "uuid";

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
  photo: {
    height: "100px",
  },
};

class newProperty extends Component {
  static contextType = StateContext;

  state = {
    property: {
      addres: "",
      country: "",
      city: "",
      description: "",
      interior: "",
      photo: [],
    },
    files: [],
  };

  entriesToState = (e) => {
    let property = Object.assign({}, this.state.property);
    property[e.target.name] = e.target.value;
    this.setState({
      property,
    });
  };

  UploadPhotos = (docs) => {
    Object.keys(docs).forEach(function (key) {
      docs[key].urlTemp = URL.createObjectURL(docs[key]);
    });

    this.setState({
      files: this.state.files.concat(docs),
    });
  };

  saveProperty = () => {
    const [{ sesion }, dispatch] = this.context; // global state
    const { property, files } = this.state;
    const firebase = this.props.firebase;

    Object.keys(files).forEach(function (key) {
      let dinamicValue = Math.floor(new Date().getTime() / 1000);
      let name = files[key].name;
      let extension = name.split(".").pop();
      files[key].alias = (
        name.split(".")[0] +
        "_" +
        dinamicValue +
        "_" +
        extension
      )
        .replace(/\s/g, "_")
        .toLowerCase();
    });

    const searchText =
      property.addres + " " + property.city + " " + property.country;

    let keywords = CreateKeyWord(searchText);

    this.props.firebase.saveAllDocs(files).then((arrayURL) => {
      property.photo = arrayURL;
      property.keywords = keywords;

      firebase.db
        .collection("Properties")
        .add(property)
        .then((success) => {
          this.props.history.push("/");
          snackbarMessage(dispatch, {
            open: true,
            message: "property saved!",
          });
        })
        .catch((error) => {
          snackbarMessage(dispatch, {
            open: true,
            message: "Fail when write in the database: " + error,
          });
        });
    });
  };

  deletePhoto = (photoName) => () => {
    this.setState({
      files: this.state.files.filter((file) => {
        return file.name !== photoName;
      }),
    });
  };

  render() {
    let imageKey = uuidv4();
    const {
      addres,
      country,
      city,
      description,
      interior,
    } = this.state.property;
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
                <Typography color='textPrimary'>New Property</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name='addres'
                onChange={this.entriesToState}
                value={addres}
                label='property addres'
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
            <Grid item xs={12} sm={12}>
              <ImageUploader
                key={imageKey}
                withIcon={true}
                buttonText='Select Images'
                onChange={this.UploadPhotos}
                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                maxFileSize={5242880}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Table>
                <TableBody>
                  {this.state.files.map((file, i) => (
                    <TableRow key={i}>
                      <TableCell align='left'>
                        <img src={file.urlTemp} style={style.photo} />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant='contained'
                          color='secondary'
                          size='small'
                          onClick={this.deletePhoto(file.name)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                onClick={this.saveProperty}
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
export default consumerFirebase(newProperty);
