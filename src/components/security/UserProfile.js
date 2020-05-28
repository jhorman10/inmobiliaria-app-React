import React, { useState, useEffect } from "react";
import { useStateValue } from "../../sesion/store";
import {
  Container,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import userPick from "../../logo.svg";
import { consumerFirebase } from "../../server";
import { snackbarMessage } from "../../sesion/actions/snackbarAction";
import ImageUploader from "react-images-upload";
import { v4 as uuidv4 } from "uuid";

const style = {
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {},
  form: {
    width: "100%",
    marginTop: 20,
  },
  submit: {
    marginTop: 15,
    marginBottom: 20,
  },
};

const UserProfile = (props) => {
  const [{ sesion }, dispatch] = useStateValue();
  const firebase = props.firebase;

  let [state, setState] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    id: "",
    pickture: "",
  });

  const dataChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveChanges = (e) => {
    e.preventDefault();

    firebase.db
      .collection("Users")
      .doc(firebase.auth.currentUser.uid)
      .set(state, { merge: true })
      .then((success) => {
        dispatch({
          type: "SESION_INIT",
          sesion: state,
          isAuthenticated: true,
        });

        snackbarMessage(dispatch, {
          open: true,
          message: "Saved changes",
        });
      })
      .catch((error) => {
        snackbarMessage(dispatch, {
          open: true,
          message: "Fail when write in the database: " + error,
        });
      });
  };

  const uploadPick = (picks) => {
    // 1. catch pickture
    const pick = picks[0];
    // 2. rename pickture
    const keyPick = uuidv4();
    // 3. get the pickture name
    const pickName = pick.name;
    // 4. get the pickture extension
    const pickExtension = pickName.split(".").pop();
    // 5. create a new name or alias for the pickture
    const alias = (pickName.split(".")[0] + "_" + keyPick + "." + pickExtension)
      .replace(/\s/g, "_")
      .toLowerCase();

    firebase.saveDocs(alias, pick).then(() => {
      firebase
        .returnDoc(alias)
        .then((urlPick) => {
          state.pickture = urlPick;
          firebase.db
            .collection("Users")
            .doc(firebase.auth.currentUser.uid)
            .set(
              {
                pickture: urlPick,
              },
              {
                merge: true,
              }
            )
            .then((userDB) => {
              dispatch({
                type: "SESION_INIT",
                sesion: state,
                isAuthenticated: true,
              });
            });

          snackbarMessage(dispatch, {
            open: true,
            message: "Pickture saved!",
          });
        })
        .catch((error) => console.log(error));
    });
  };

  const validateForm = (sesion) => {
    if (sesion) {
      setState(sesion.user);
    }
  };

  useEffect(() => {
    if (state.id === "") {
      validateForm(sesion);
    }
  }, [state.id, sesion]);

  let pickIdRamdom = uuidv4();

  return sesion ? (
    <Container component='main' maxWidth='md' justify='center'>
      <div style={style.paper}>
        <Avatar style={style.avatar} src={state.pickture || userPick} />
        <Typography component='h1' variant='h6'>
          {state.name}
        </Typography>
        <Typography component='h1' variant='h5'>
          Account Profile
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                name='name'
                variant='outlined'
                fullWidth
                label='Name'
                value={state.name}
                onChange={dataChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name='lastname'
                variant='outlined'
                fullWidth
                label='Lastname'
                value={state.lastname}
                onChange={dataChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name='email'
                variant='outlined'
                fullWidth
                type='email'
                label='Email'
                value={state.email}
                onChange={dataChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name='phone'
                variant='outlined'
                fullWidth
                type='number'
                label='Phone Number'
                value={state.phone}
                onChange={dataChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ImageUploader
                withIcon={false}
                key={pickIdRamdom}
                singleImage={true}
                buttonText='Select a profile image'
                onChange={uploadPick}
                imgExtension={[".jpg", ".gif", ".png", ".jpeg", ""]}
                maxFileSize={5242880}
                fileTypeError='is not supported file extension'
              />
            </Grid>
          </Grid>
          <Grid container justify='center'>
            <Grid item xs={12} md={6}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                size='large'
                color='primary'
                style={style.submit}
                onClick={saveChanges}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  ) : null;
};
export default consumerFirebase(UserProfile);
