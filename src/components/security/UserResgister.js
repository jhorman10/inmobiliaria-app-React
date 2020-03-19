import React, { Component } from "react";
import { Container, Avatar, Typography, Grid, TextField, Button } from "@material-ui/core";
import LockOutLineIcon from '@material-ui/icons/LockOutlined';

const style = {
    paper: {
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alingItems: "center"
    },
    avatar: {
        margin: 8,
        backgroundColor: "#E53935",
    },
    form: {
        width: "100%",
        marginTop: 10,
    },
    submit: {
        marginTop: 15,
        marginBotton: 20
    }
}

class UserResgister extends Component {
  render() {
    return (
      <Container maxWidth="md">
        <div style={ style.paper }>
            <Avatar style={ style.avatar }>
                <LockOutLineIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up!
            </Typography>
            <form style={ style.form }>
                <Grid container spacing={ 2 }>
                    <Grid item md={ 6 } xs={ 12 }>
                        <TextField 
                            name="Name" 
                            fullWidth
                            label="Write your name"
                        />
                    </Grid>
                    <Grid item md={ 6 } xs={ 12 }>
                        <TextField 
                            name="LastName" 
                            fullWidth
                            label="Write your lastname"
                        />
                    </Grid>
                    <Grid item md={ 6 } xs={ 12 }>
                        <TextField 
                            name="Email" 
                            fullWidth
                            label="Write your E-mail"
                        />
                    </Grid>
                    <Grid item md={ 6 } xs={ 12 }>
                        <TextField 
                            type="password"
                            name="Password" 
                            fullWidth
                            label="Write your password"
                        />
                    </Grid>
                </Grid>
                <Grid container justify="center">
                <Grid item md={ 6 } xs={ 12 }>
                        <Button 
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            color="primary"
                            style={ style.submit }
                        >
                            Go!
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
      </Container>
    );
  }
}

export default UserResgister;