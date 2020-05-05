import React from "react";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

export const LeftMenu = ({ classes }) => (
  <div className={classes.list}>
    <List>
      <ListItem component={Link} to='/profile' button>
        <i className='material-icons'>account_box</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary='Profile'
        />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem component={Link} to='/new-propierty' button>
        <i className='material-icons'>add_box</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary='New properties'
        />
      </ListItem>
      <ListItem component={Link} to='' button>
        <i className='material-icons'>business</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary='Properties'
        />
      </ListItem>
      <ListItem component={Link} to='' button>
        <i className='material-icons'>mail_outline</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary='Messages'
        />
      </ListItem>
    </List>
  </div>
);
