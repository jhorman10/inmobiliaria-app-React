import React, { Component } from "react";
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import LockOutLineIcon from "@material-ui/icons/LockOutlined";
import { compose } from "recompose";
import { consumerFirebase } from "../../server";
import { sesionInit } from "../../sesion/actions/sesionAction";
import { StateContext } from "../../sesion/store";
import { snackbarMessage } from "../../sesion/actions/snackbarAction";

const style = {
  paper: {
    marginTop: 9,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 5,
    backgroundColor: "green",
  },
  form: {
    width: "100%",
    marginTop: 8,
  },
};

class Login extends Component {
  static contextType = StateContext;

  state = {
    firebase: null,
    userState: {
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

  onHandleChange = (e) => {
    let user = Object.assign({}, this.state.userState);
    user[e.target.name] = e.target.value;
    this.setState({
      userState: user,
    });
  };

  login = async (e) => {
    e.preventDefault();
    const [{ sesion }, dispatch] = this.context;
    const { firebase, userState } = this.state;
    const { email, password } = userState;
    let callback = await sesionInit(dispatch, firebase, email, password);
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
    const { email, password } = this.state.userState;
    return (
      <Container maxWidth="xs">
        <div style={style.paper}>
          <Avatar style={style.avatar}>
            <LockOutLineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Name
          </Typography>
          <form style={style.form}>
            <TextField
              variant="outlined"
              label="E-mail"
              name="email"
              fullWidth
              margin="normal"
              onChange={this.onHandleChange}
              value={email}
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              name="password"
              fullWidth
              margin="normal"
              onChange={this.onHandleChange}
              value={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.login}
            >
              Send
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}
export default compose(consumerFirebase)(Login);
