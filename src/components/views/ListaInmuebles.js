import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import {
  Container,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  TextField,
  CardMedia,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { consumerFirebase } from "../../server";
import logo from "../../logo.svg";

const style = {
  cardGrid: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  paper: {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    minHeight: 650,
  },
  link: {
    display: "flex",
  },
  gridTextField: {
    marginTop: "20px",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
};

class ListaInmuebles extends Component {
  state = {
    properties: [],
    searchText: "",
  };

  handleChangeSearch = (e) => {
    const self = this;
    self.setState({
      [e.target.name]: e.target.value,
    });

    // if (self.state.typingTimeOut) {
    //   ClearTimeout(self.state.typingTimeOut);
    // }

    self.setState({
      name: e.target.value,
      typing: false,
      typingTimeOut: setTimeout((goTime) => {
        let objectQuery = this.props.firebase.db
          .collection("Properties")
          .orderBy("addres")
          .where(
            "keywords",
            "array-contains",
            self.state.searchText.toLowerCase()
          );

        if (self.state.searchText.trim() === "") {
          objectQuery = this.props.firebase.db
            .collection("Properties")
            .orderBy("addres");
        }

        objectQuery.get().then((snapshot) => {
          const arrayProperties = snapshot.docs.map((doc) => {
            let data = doc.data();
            let id = doc.id;
            return { id, ...data };
          });
          this.setState({
            properties: arrayProperties,
          });
        });
      }, 500),
    });
  };

  async componentDidMount() {
    let objectQuery = this.props.firebase.db
      .collection("Properties")
      .orderBy("addres");

    const snapshot = await objectQuery.get();

    const arrayProperties = snapshot.docs.map((doc) => {
      let data = doc.data();
      let id = doc.id;
      return { id, ...data };
    });

    this.setState({ properties: arrayProperties });
  }

  render() {
    const { searchText, properties } = this.state;
    return (
      <Container style={style.cardGrid}>
        <Paper style={style.paper}>
          <Grid item xs={12} sm={12}>
            <Breadcrumbs aria-label='Breadcrumbs'>
              <Link color='inherit' style={style.link} href='/'>
                <HomeIcon />
              </Link>
              <Typography color='textPrimary'>My Properties</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12} sm={6} style={style.gridTextField}>
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              name='searchText'
              variant='outlined'
              label='Search a property'
              onChange={this.handleChangeSearch}
              value={searchText}
            />
          </Grid>
          <Grid item xs={12} sm={12} style={style.gridTextField}>
            <Grid container spacing={4}>
              {properties.map((card) => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card style={style.card}>
                    <CardMedia
                      style={style.cardMedia}
                      image={
                        card.photo
                          ? card.photo[0]
                            ? card.photo[0]
                            : logo
                          : logo
                      }
                      title='My Property'
                    />
                    <CardContent style={style.cardContent}>
                      <Typography gutterBottom variant='h5' component='h2'>
                        {card.city + ", " + card.country}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button color='primary' size='small'>
                        Editar
                      </Button>
                      <Button color='primary' size='small'>
                        Eliminar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}
export default consumerFirebase(ListaInmuebles);
