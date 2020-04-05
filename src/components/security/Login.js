import React, { Component } from 'react'
import { Container, Avatar, Typography, Grid, TextField } from '@material-ui/core'
import LockOutLineIcon from '@material-ui/icons/LockOutlined'

const style = {
    papar:{
        marginTop:9,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar:{
        margin: 5,
        backgroundColor: 'red'
    },
    form:{
        width: '100%',
        marginTop: 8
    }
}

export default class Login extends Component {
    render() {
        return (
            <Container maxWidth="xs">
                <div style={ style.paper }>
                    <Avatar style={ style.avatar }>
                        <LockOutLineIcon></LockOutLineIcon>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        User Name
                    </Typography>
                    <form style={ style.form }>
                        <TextField></TextField>
                    </form>
                </div>
            </Container>
        )
    }
}
