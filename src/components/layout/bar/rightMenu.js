import React from "react";
import { List, ListItem, Link, Avatar, ListItemText } from "@material-ui/core";

export const RightMenu = ({
  classes,
  user,
  userText,
  userPickture,
  endSesion,
}) => (
  <div className={classes.list}>
    <List>
      <ListItem button component={Link} to="/auth/UserRegister">
        <Avatar classes={{ primary: classes.avatarSize }} src={userPickture} />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary={userText}
        />
      </ListItem>
      <ListItem button onClick={endSesion}>
        <listItemText
          classes={{ primary: classes.listItemText }}
          primary="Sign Out"
        />
      </ListItem>
    </List>
  </div>
);
