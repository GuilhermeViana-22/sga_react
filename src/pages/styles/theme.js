import { createTheme } from '@mui/material/styles';
import { red, yellow } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        warning: {
            main: yellow.A700,
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;
