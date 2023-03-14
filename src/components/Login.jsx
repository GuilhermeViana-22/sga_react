import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {InputLabel} from "@material-ui/core";
import login from "../assets/login_logo.png";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            <img src={login}/>
        </Typography>
    );
}

function redirectToHome() {
    window.location.replace('/home');
}

const theme = createTheme();

export default function SignIn() {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" sx={{height: '80vh', display: 'flex', alignItems: 'center'}}>
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '400px'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sistema de gerenciamento
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <InputLabel style={{padding: '0.6rem'}}>Email</InputLabel>
                        <TextField
                            fullWidth
                            id="outlined-required"
                            placeholder="Email"
                            variant="outlined"
                            inputProps={{maxLength: 50}}
                        />
                        <InputLabel style={{padding: '0.6rem'}}>Senha</InputLabel>
                        <TextField
                            fullWidth
                            id="outlined-required"
                            placeholder="Senha"
                            variant="outlined"
                            inputProps={{maxLength: 50}}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Link to="/home">
                            <Button
                                onClick={() => redirectToHome()}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                                Entrar
                            </Button>
                        </Link>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" align="center">
                                    Esqueceu a senha ?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
