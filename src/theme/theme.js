import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary:{
            main: '#2E9AFE'
        },
        secondary:{
            main: '#FE2E2E'
        },
        common:{
            white: 'white'
        },
    },
    spacing: 10
});

export default theme;