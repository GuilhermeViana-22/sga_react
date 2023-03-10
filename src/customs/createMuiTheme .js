import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ff0000', // sua cor primária personalizada aqui
        },
        secondary: {
            main: '#00ff00',
        },
        purple: {
            primary: '#391960',
        },
    },
});

export default theme;