import React, { Component } from "react";
import {
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Link,
  Avatar,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { consumerFirebase } from "../../../server";
import { compose } from "recompose";
import { StateContext } from "../../../sesion/store";
import { endSesion } from "../../../sesion/actions/sesionAction";
import { RightMenu } from "../../../components/layout/bar/rightMenu";
import { LeftMenu } from "../../../components/layout/bar/leftMenu";
import userPick from "../../../logo.svg";
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
  avatarSize: {
    width: 40,
    height: 40,
  },
  listItemText: {
    fontSize: "14px",
    fontWeight: 600,
    paddingLeft: "15px",
    color: "#212121",
  },
  list: {
    width: 250,
  },
});

class BarSesion extends Component {
  static contextType = StateContext;

  state = {
    firebase: null,
    right: false,
    left: false,
  };

  EndSesionApp = () => {
    const { firebase } = this.state;
    const [{ sesion }, dispatch] = this.context;

    endSesion(dispatch, firebase).then((success) => {
      this.props.history.push("/auth/Login");
    });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let newsObjects = {};

    if (nextProps.firebase !== prevState.firebase) {
      newsObjects.firebase = nextProps.firebase;
    }
    return newsObjects;
  }

  render() {
    const { classes } = this.props;
    const [{ sesion }, dispatch] = this.context;
    const { user } = sesion;
    let userText = user.name + " " + user.lastname;
    return (
      <div>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          anchor="left"
        >
          <div
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            <LeftMenu classes={classes} />
          </div>
        </Drawer>
        <Drawer
          open={this.state.right}
          onClose={this.toggleDrawer("right", false)}
          anchor="right"
        >
          <div
            role="button"
            onClick={this.toggleDrawer("right", false)}
            onKeyDown={this.toggleDrawer("right", false)}
          >
            <RightMenu
              classes={classes}
              user={user}
              userText={userText}
              userPickture={userPick}
              endSesion={this.EndSesionApp}
            />
          </div>
        </Drawer>
        <Toolbar>
          <IconButton color="inherit" onClick={this.toggleDrawer("left", true)}>
            <i className="material-icons">menu</i>
          </IconButton>
          <Typography variant="h6">Welcome!</Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" Component={Link} to="">
              <i className="material-icons">mail_outline</i>
            </IconButton>
            <Button color="inherit" onClick={this.EndSesionApp}>
              Log Out
            </Button>
            <Button>
              {userText}
            </Button>
            <Avatar src={userPick}></Avatar>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              color="inherit"
              onClick={this.toggleDrawer("right", true)}
            >
              <i className="material-icons">more_vert</i>
            </IconButton>
          </div>
        </Toolbar>
      </div>
    );
  }
}

export default compose(
  withRouter,
  consumerFirebase,
  withStyles(styles)
)(BarSesion);
