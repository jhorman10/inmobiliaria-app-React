import React, { Component } from "react";
import {
  Container,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import LockOutLineIcon from "@material-ui/icons/LockOutlined";
import { compose } from "recompose";
import { consumerFirebase } from "../../server";
import { createUser } from "../../sesion/actions/sesionAction";
import { snackbarMessage } from "../../sesion/actions/snackbarAction";
import { StateContext } from "../../sesion/store";

const style = {
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 8,
    backgroundColor: "darkgrey",
  },
  form: {
    width: "100%",
    marginTop: 10,
  },
  submit: {
    marginTop: 15,
    marginBotton: 20,
  },
};

const initialUser = {
  name: "",
  lastname: "",
  email: "",
  password: "",
};

class UserResgister extends Component {
  static contextType = StateContext;

  state = {
    firebase: null,
    user: {
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.firebase === prevState.firebase) {
      return null;
    }
    return {
      firebase: nextProps.firebase,
    };
  }

  onHandleWrite = (e) => {
    let user = Object.assign({}, this.state.user);
    user[e.target.name] = e.target.value;
    this.setState({
      user: user,
    });
  };

  onHandleSubmit = async (e) => {
    e.preventDefault();
    const [{ sesion }, dispatch] = this.context;
    const { firebase, user } = this.state;

    let callback = await createUser(dispatch, firebase, user);
    if (callback.status) {
      this.props.history.push("/");
    } else {
      snackbarMessage(dispatch, {
        open: true,
        message: callback.message.message,
      });
    }
  };

  render() {
    const { name, lastname, email, password } = this.state.user;
    return (
      <Container maxWidth='md'>
        <div style={style.paper}>
          <Avatar style={style.avatar}>
            <LockOutLineIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign Up!
          </Typography>
          <form style={style.form}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  name='name'
                  value={name}
                  onChange={this.onHandleWrite}
                  fullWidth
                  label='Write your name'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name='lastname'
                  value={lastname}
                  onChange={this.onHandleWrite}
                  fullWidth
                  label='Write your lastname'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  type='email'
                  name='email'
                  value={email}
                  onChange={this.onHandleWrite}
                  fullWidth
                  label='Write your E-mail'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  type='password'
                  name='password'
                  value={password}
                  onChange={this.onHandleWrite}
                  fullWidth
                  label='Write your password'
                />
              </Grid>
            </Grid>
            <Grid container justify='center'>
              <Grid item md={6} xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  fullWidth
                  size='large'
                  color='primary'
                  onClick={this.onHandleSubmit}
                  style={style.submit}
                >
                  ¡Go!
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default compose(consumerFirebase)(UserResgister);
