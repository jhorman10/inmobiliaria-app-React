import React, { Component } from "react";
import { consumerFirebase } from "../../server";
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
import ImageUploader from "react-images-upload";
import { v4 as uuidv4 } from "uuid";
import { CreateKeyWord } from "../../sesion/actions/keyWord";

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
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: "4px",
  },
  submit: {
    marginTop: 15,
    marginBottom: 10,
  },
  photoProperty: {
    height: "100px",
  },
};

class EditProperty extends Component {
  state = {
    property: {
      addres: "",
      city: "",
      country: "",
      description: "",
      interior: "",
      photo: [],
    },
  };

  changeData = (e) => {
    let property = Object.assign({}, this.state.property);
    property[e.target.name] = e.target.value;
    this.setState({ property });
  };

  uploadImages = (images) => {
    const { property } = this.state;
    const { id } = this.props.match.params;
    const firebase = this.props.firebase;

    Object.keys(images).forEach((key) => {
      let dinamicCode = uuidv4();
      let imageName = images[key].name;
      let extension = imageName.split(".").pop();
      images[key].alias = (
        imageName.split(".")[0] +
        "_" +
        dinamicCode +
        "." +
        extension
      )
        .replace(/\s/g, "_")
        .toLowerCase();
    });
    this.props.firebase.saveAllDocs(images).then((urlImages) => {
      property.photo = property.photo.concat(urlImages);

      firebase.db
        .collection("Properties")
        .doc(id)
        .set(property, { merge: true })
        .then((success) => {
          console.log(success);
          this.setState({
            property,
          });
        });
    });
  };

  deletePhoto = (urlPhoto) => async () => {
    const firebase = this.props.firebase;
    const { property } = this.state;
    const { id } = this.props.match.params;

    let photoId = urlPhoto.match(/[\w-]+.(jpg|png|jpeg|gif|svg)/);
    photoId = photoId[0];

    await firebase.deleteDocs(photoId);

    let lisPhoto = this.state.property.photo.filter((photo) => {
      return photo !== urlPhoto;
    });

    property.photo = lisPhoto;
    firebase.db
      .collection("Properties")
      .doc(id)
      .set(property, { merge: true })
      .then((success) => {
        this.setState({
          property,
        });
      });
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const propertyCollection = this.props.firebase.db.collection("Properties");

    const propertyDb = await propertyCollection.doc(id).get();
    // console.log(propertyDb.data());
    this.setState({
      property: propertyDb.data(),
    });
  }

  saveProperty = () => {
    const { property } = this.state;
    const { id } = this.props.match.params;
    const searchText =
      property.direction + " " + property.city + " " + property.country + " ";
    const keywords = CreateKeyWord(searchText);
    property.keywords = keywords;
    this.props.firebase.db
      .collection("Properties")
      .doc(id)
      .set(property, { merge: true })
      .then((success) => {
        this.props.history.push("/");
      });
  };

  render() {
    // const { id } = this.props.match.params;
    // console.log(this.props.firebase.db.collection("Properties").doc(id));
    let uniqueID = uuidv4();
    const { property } = this.state;
    const { addres, city, country, description, interior, photo } = property;
    return (
      <Container style={style.container}>
        <Paper style={style.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Breadcrumbs aria-label='breadcrumbs'>
                <Link color='inherit' style={style.link} href='/'>
                  <HomeIcon style={style.homeIcon} />
                  Home
                </Link>
                <Typography color='textPrimary'>Edit property</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                value={addres}
                onChange={this.changeData}
                name='addres'
                label='Addres'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={city}
                onChange={this.changeData}
                name='city'
                label='City'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={country}
                onChange={this.changeData}
                name='country'
                label='Country'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                value={description}
                onChange={this.changeData}
                name='description'
                label='Description'
                fullWidth
                multiline
                rowsMax='4'
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                value={interior}
                onChange={this.changeData}
                name='interior'
                label='Interior'
                fullWidth
                rowsMax='4'
              />
            </Grid>
          </Grid>
          <Grid container justify='center'>
            <Grid item xs={12} sm={12}>
              <ImageUploader
                key={uniqueID}
                withIcon={true}
                buttonText='Select images'
                onChange={this.uploadImages}
                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Table>
                <TableBody>
                  {photo
                    ? photo.map((photo, i) => {
                        return (
                          <TableRow key={i}>
                            <TableCell align='left'>
                              <img src={photo} style={style.photoProperty} />
                            </TableCell>
                            <TableCell align='left'>
                              <Button
                                variant='contained'
                                color='secondary'
                                onClick={this.deletePhoto(photo)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
          <Grid container justify='center' spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                style={style.submit}
                type='button'
                color='primary'
                fullWidth
                variant='contained'
                size='large'
                onClick={this.saveProperty}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}
export default consumerFirebase(EditProperty);
